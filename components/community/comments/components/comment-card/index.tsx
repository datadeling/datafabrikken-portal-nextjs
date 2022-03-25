import React, { FC, memo, useState } from 'react';
import parse, { HTMLReactParserOptions } from 'html-react-parser';
import { compose } from 'redux';

import type { CommunityPost, CommunityUser } from '../../../../../types';

import User from '../../../user';
import Composer from '../composer';
import Buttons from '../buttons/styled';

import SC from './styled';

import TimeAgo from '../time-ago';
import {
  usePostCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation
} from '../../../../../services/api/user-feedback-api/comments';
import Translation from '../../../../translation';
import GifWrapper from '../../../../gif-wrapper';

const commentIconBaseSrc = '../../../../public/images/comment-icon.inline.svg';

const parserOptions: HTMLReactParserOptions = {
  replace: (domNode: any) => {
    if (domNode?.name === 'img' && domNode?.attribs?.src?.includes('.gif')) {
      return (
        <GifWrapper
          src={domNode.attribs.src}
          alt={domNode.attribs?.alt}
          height={domNode.attribs?.height}
          width={domNode.attribs?.width}
        />
      );
    }
    return domNode;
  }
};

enum Mode {
  UPDATE,
  REPLY,
  NONE
}
interface Props {
  comment: CommunityPost;
  currentUser?: Partial<CommunityUser>;
  entityId: string;
  isReply: boolean;
  replies?: CommunityPost[];
}

const CommentCard: FC<Props> = ({
  comment,
  currentUser,
  entityId,
  isReply,
  replies
}) => {
  const [postComment] = usePostCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [currentMode, setCurrentMode] = useState<Mode>(Mode.NONE);
  const [showAllReplies, setShowAllReplies] = useState(false);

  const oneDayMillis = 24 * 60 * 60 * 1000;

  const hasReplies = (replies?.length ?? 0) > 0;
  const maxVisibleReplies = 3;
  const croppedReplies = showAllReplies
    ? replies
    : replies?.slice(-maxVisibleReplies);

  const sendPost = (content: string, mode: Mode) => {
    switch (mode) {
      case Mode.UPDATE:
        updateComment({
          id: entityId,
          post: { ...comment, content },
          page: comment.page ?? 1
        });
        break;

      case Mode.REPLY:
      default:
        postComment({
          id: entityId,
          post: { content, toPid: comment.pid }
        });
        break;
    }
  };
  return (
    <SC.CommentCard $isReply={isReply}>
      <SC.CommentInfo>
        <User user={comment.user} />
        <TimeAgo startTime={comment.timestamp} cutOff={oneDayMillis} />
      </SC.CommentInfo>
      {parse(comment?.content, parserOptions)}
      {((hasReplies && currentMode === Mode.UPDATE) ||
        (!hasReplies && currentMode !== Mode.NONE)) && (
        <Composer
          openToggle={() => setCurrentMode(Mode.NONE)}
          onSubmit={(content: string) => sendPost(content, currentMode)}
          initialValue={currentMode === Mode.UPDATE ? comment.content : ''}
        />
      )}
      <SC.CommentActions>
        <SC.ButtonContainer>
          {(replies?.length ?? 0) > maxVisibleReplies && (
            <Buttons.UnderlineButton
              onClick={() => setShowAllReplies(!showAllReplies)}
            >
              {showAllReplies ? (
                <Translation id='community.comments.buttons.collapseReplies' />
              ) : (
                <Translation
                  id='community.comments.buttons.expandReplies'
                  values={{ count: replies?.length ?? 0 }}
                />
              )}
            </Buttons.UnderlineButton>
          )}

          {currentUser && !replies && !isReply && currentMode === Mode.NONE && (
            <Buttons.UnderlineButton
              onClick={() => {
                setCurrentMode(Mode.REPLY);
              }}
            >
              <Translation id='community.comments.buttons.reply' />{' '}
              <SC.CommentIcon
                layout='fill'
                alt='Comment icon'
                src={commentIconBaseSrc}
              />
            </Buttons.UnderlineButton>
          )}
        </SC.ButtonContainer>

        <SC.ButtonContainer>
          {currentUser?.uid === comment.user.uid && currentMode === Mode.NONE && (
            <>
              <Buttons.UnderlineButton
                onClick={() => {
                  setCurrentMode(Mode.UPDATE);
                }}
              >
                <Translation id='community.comments.buttons.edit' />
              </Buttons.UnderlineButton>
              <Buttons.UnderlineButton
                onClick={() =>
                  deleteComment({
                    id: entityId,
                    post: comment,
                    invalidatedPages: Array.from(
                      { length: comment.page ?? 1 },
                      (_, i) => i + 1
                    )
                  })
                }
              >
                <Translation id='community.comments.buttons.delete' />
              </Buttons.UnderlineButton>
            </>
          )}
        </SC.ButtonContainer>
      </SC.CommentActions>
      {croppedReplies && (
        <ul>
          {croppedReplies?.map((reply, index) => (
            <CommentCard
              comment={reply}
              currentUser={currentUser}
              entityId={entityId}
              isReply
              key={`comment-card-id-${comment.pid}-reply-${index}-`}
            />
          ))}
        </ul>
      )}

      {currentUser && hasReplies && !isReply && (
        <SC.CommentActions>
          {currentMode === Mode.REPLY && (
            <Composer
              openToggle={() => setCurrentMode(Mode.NONE)}
              onSubmit={(content: string) => sendPost(content, currentMode)}
            />
          )}
          {currentMode === Mode.NONE && (
            <Buttons.UnderlineButton
              onClick={() => {
                setCurrentMode(Mode.REPLY);
              }}
            >
              <Translation id='community.comments.buttons.reply' />
              <SC.CommentIcon alt='Comment icon' src={commentIconBaseSrc} />
            </Buttons.UnderlineButton>
          )}
        </SC.CommentActions>
      )}
    </SC.CommentCard>
  );
};

export default compose<FC<Props>>(memo)(CommentCard);
