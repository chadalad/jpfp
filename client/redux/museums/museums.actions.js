import { UPDATE_FORM } from './museums.types';

const updateForm = (name, value) => ({
  type: UPDATE_FORM,
  name,
  value,
});

export {
  updateForm,
};
