import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NotesIcon from '../icons/notes';
import TagIcon from '../icons/tag';
import TrashIcon from '../icons/trash';

import actions from '../state/actions';

import * as S from '../state';

const NoNotes = () => {
  const hasLoaded = useSelector((state: S.State) => state.ui.hasLoadedNotes);
  const searchQuery = useSelector((state: S.State) => state.ui.searchQuery);
  const showTrash = useSelector((state: S.State) => state.ui.showTrash);
  const openedTag = useSelector((state: S.State) => state.ui.openedTag);
  const dispatch = useDispatch();

  const getSearchButton = () => {
    return (
      <button
        onClick={() =>
          dispatch(actions.ui.createNote({ content: searchQuery }))
        }
      >
        Create a new note titled &quot;{searchQuery}&quot;
      </button>
    );
  };

  let message, icon, button;

  switch (true) {
    case searchQuery.length > 0:
      message = 'No Results';
      icon = null;
      button = getSearchButton();
      break;
    case openedTag !== null:
      message = `No notes tagged "${openedTag}"`;
      icon = <TagIcon />;
      button = '';
      break;
    case showTrash:
      message = 'Your trash is empty';
      icon = <TrashIcon />;
      button = '';
      break;
    default:
      message = 'Create your first note';
      icon = <NotesIcon />;
      button = '';
  }

  return (
    <div className="note-list-placeholder theme-color-fg">
      <div className="no-notes-icon">{icon}</div>
      <div className="no-notes-message">{message}</div>
      <div className="no-notes-button">{hasLoaded && button}</div>
    </div>
  );
};

export default NoNotes;
