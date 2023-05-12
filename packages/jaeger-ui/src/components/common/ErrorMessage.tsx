// Copyright (c) 2017 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as React from 'react';

import { ApiError } from '../../types/api-error';

import './ErrorMessage.css';
import { CrossedCrosshairCircleIcon } from './icons/CrossedCrosshairCircleIcon';
import { SlackLogoIcon } from './icons/SlackLogoIcon';
import { BrokenLinkCircleIcon } from './icons/BrokenLinkCircleIcon';
import { isString } from '../../utils/ts/typeGuards/isString';

const SLACK_CHANNEL_URL =
  'https://join.slack.com/t/continuous-feedback/shared_invite/zt-1hk5rbjow-yXOIxyyYOLSXpCZ4RXstgA';

type ErrorMessageProps = {
  className?: string;
  detailClassName?: string;
  messageClassName?: string;
  error: ApiError;
};

type SubPartProps = {
  className?: string;
  error: ApiError;
  wrap?: boolean;
  wrapperClassName?: string;
};

type DigmaErrorMessageProps = {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
};

function ErrorAttr({ name, value }: { name: string; value: any }) {
  return (
    <tr className="ErrorMessage--detailItem">
      <td className="ErrorMessage--attr">{name}</td>
      <td className="ErrorMessage--value">{value}</td>
    </tr>
  );
}

export function Message(props: SubPartProps) {
  const { className, error, wrap, wrapperClassName } = props;
  const cssClass = `ErrorMessage--msg ${className || ''}`;
  const msg =
    typeof error === 'string' ? (
      <h3 className={cssClass}>{error}</h3>
    ) : (
      <h3 className={cssClass}>{error.message}</h3>
    );
  if (wrap) {
    return <div className={`ErrorMessage ${wrapperClassName || ''}`}>{msg}</div>;
  }
  return msg;
}

Message.defaultProps = {
  className: undefined,
  wrap: false,
  wrapperClassName: undefined,
};

export function Details(props: SubPartProps) {
  const { className, error, wrap, wrapperClassName } = props;
  if (typeof error === 'string') {
    return null;
  }
  const { httpStatus, httpStatusText, httpUrl, httpQuery, httpBody } = error;
  const bodyExcerpt = httpBody && httpBody.length > 1024 ? `${httpBody.slice(0, 1021).trim()}...` : httpBody;
  const details = (
    <div className={`ErrorMessage--details ${className || ''} u-simple-scrollbars`}>
      <table className="ErrorMessage--detailsTable">
        <tbody>
          {httpStatus ? <ErrorAttr name="Status" value={httpStatus} /> : null}
          {httpStatusText ? <ErrorAttr name="Status text" value={httpStatusText} /> : null}
          {httpUrl ? <ErrorAttr name="URL" value={httpUrl} /> : null}
          {httpQuery ? <ErrorAttr name="Query" value={httpQuery} /> : null}
          {bodyExcerpt ? <ErrorAttr name="Response body" value={bodyExcerpt} /> : null}
        </tbody>
      </table>
    </div>
  );

  if (wrap) {
    return <div className={`ErrorMessage ${wrapperClassName || ''}`}>{details}</div>;
  }
  return details;
}

Details.defaultProps = {
  className: undefined,
  wrap: false,
  wrapperClassName: undefined,
};

export const DigmaErrorMessage = (props: DigmaErrorMessageProps) => (
  <div className="CustomErrorMessage">
    {props.icon}
    <div className="CustomErrorMessage--text">
      <span className="CustomErrorMessage--title">{props.title}</span>
      <span className="CustomErrorMessage--description">{props.content}</span>
    </div>
    <a
      href={SLACK_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="CustomErrorMessage--slackLink"
    >
      <SlackLogoIcon />
      Join our slack channel for support
    </a>
  </div>
);

export default function ErrorMessage({
  className,
  detailClassName,
  error,
  messageClassName,
}: ErrorMessageProps) {
  if (!error) {
    return null;
  }
  if (typeof error === 'string') {
    return <Message className={messageClassName} error={error} wrapperClassName={className} wrap />;
  }

  if (error.message.includes('trace not found')) {
    return (
      <DigmaErrorMessage
        icon={<CrossedCrosshairCircleIcon size={72} color="#56b5bc" />}
        title="We Cannot Find the Trace You're Looking For..."
        content={
          <>
            Our bad, the trace might be old or we may have simply missed it somehow.
            <br />
            No need to worry! Please run some more actions and check again
            <br />
            <br />
            If you&apos;re using your your own Jaeger instance, please check that Digma knows to send traces
            to it as well.
            <br />
            Check the &quot;Jaeger Query URL&quot; parameter in the Digma plugin settings and make sure it
            matches your Jaeger address
          </>
        }
      />
    );
  }

  if (error.message.includes('Failed to fetch')) {
    const isUserDefinedJaegerQueryURL = window.isUserDefinedJaegerQueryURL === true;
    return (
      <DigmaErrorMessage
        icon={<BrokenLinkCircleIcon size={72} color="#56b5bc" />}
        title="Jaeger Not Available"
        content={
          isUserDefinedJaegerQueryURL ? (
            <>
              The Jaeger link
              {isString(window.apiBaseUrl) && (
                <>
                  {' '}
                  <a
                    className="CustomErrorMessage--link"
                    href={window.apiBaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {window.apiBaseUrl}
                  </a>
                </>
              )}{' '}
              is not available.
              <br />
              Please makes sure the link you specified in the
              <br />
              Digma plugin settings is correct.
            </>
          ) : (
            <>
              Something is wrong and we are unable to communicate
              <br />
              with the Digma Jaeger instance.
              <br />
              Please make sure Digma is fully up and running
              <br />
              and try updating to the latest version.
            </>
          )
        }
      />
    );
  }

  return (
    <div className={`ErrorMessage ${className || ''}`}>
      <Message error={error} className={messageClassName} />
      <Details error={error} className={detailClassName} />
    </div>
  );
}

ErrorMessage.defaultProps = {
  className: undefined,
  detailClassName: undefined,
  messageClassName: undefined,
};
