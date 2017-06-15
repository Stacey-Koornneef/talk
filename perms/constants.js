module.exports = {

  // mutations
  CREATE_COMMENT: 'CREATE_COMMENT',
  CREATE_ACTION: 'CREATE_ACTION',
  DELETE_ACTION: 'DELETE_ACTION',
  EDIT_NAME: 'EDIT_NAME',
  EDIT_COMMENT: 'EDIT_COMMENT',
  REJECT_USERNAME: 'REJECT_USERNAME',
  SET_USER_STATUS: 'SET_USER_STATUS',
  SUSPEND_USER: 'SUSPEND_USER',
  SET_COMMENT_STATUS: 'SET_COMMENT_STATUS',
  ADD_COMMENT_TAG: 'ADD_COMMENT_TAG',
  REMOVE_COMMENT_TAG: 'REMOVE_COMMENT_TAG',
  UPDATE_USER_ROLES: 'UPDATE_USER_ROLES',
  UPDATE_CONFIG: 'UPDATE_CONFIG',

  // queries
  SEARCH_ASSETS: 'SEARCH_ASSETS',
  SEARCH_OTHER_USERS: 'SEARCH_OTHER_USERS',
  SEARCH_ACTIONS: 'SEARCH_ACTIONS',
  SEARCH_NON_NULL_OR_ACCEPTED_COMMENTS: 'SEARCH_NON_NULL_OR_ACCEPTED_COMMENTS',
  SEARCH_OTHERS_COMMENTS: 'SEARCH_OTHERS_COMMENTS',
  SEARCH_COMMENT_METRICS: 'SEARCH_COMMENT_METRICS',

  // subscriptions
  SUBSCRIBE_COMMENT_STATUS: 'SUBSCRIBE_COMMENT_STATUS',
  SUBSCRIBE_ALL_COMMENT_FLAGS: 'SUBSCRIBE_ALL_COMMENT_FLAGS',
  SUBSCRIBE_ALL_COMMENT_EDITS: 'SUBSCRIBE_ALL_COMMENT_EDITS',
};
