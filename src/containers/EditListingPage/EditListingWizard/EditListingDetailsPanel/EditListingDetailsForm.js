import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';

// Import configs and util modules
import config from '../../../../config';
import { intlShape, injectIntl, FormattedMessage } from '../../../../util/reactIntl';
import { propTypes } from '../../../../util/types';
import { maxLength, required, composeValidators } from '../../../../util/validators';
import { findConfigForSelectFilter } from '../../../../util/search';

// Import shared components
import { Form, Button, FieldTextInput } from '../../../../components';
// Import modules from this directory
import CustomFieldEnum from '../CustomFieldEnum';
import css from './EditListingDetailsForm.module.css';

const TITLE_MAX_LENGTH = 60;

const EditListingDetailsFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        autoFocus,
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        filterConfig,
      } = formRenderProps;

      const titleMessage = intl.formatMessage({ id: 'EditListingDetailsForm.title' });
      const titlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDetailsForm.titlePlaceholder',
      });
      const titleRequiredMessage = intl.formatMessage({
        id: 'EditListingDetailsForm.titleRequired',
      });
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingDetailsForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const descriptionMessage = intl.formatMessage({
        id: 'EditListingDetailsForm.description',
      });
      const descriptionPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDetailsForm.descriptionPlaceholder',
      });
      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
      const descriptionRequiredMessage = intl.formatMessage({
        id: 'EditListingDetailsForm.descriptionRequired',
      });

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDetailsForm.updateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDetailsForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDetailsForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      const styleConfig = findConfigForSelectFilter('style', filterConfig);
      const styleSchemaType = styleConfig.schemaType;
      const styles = styleConfig.options ? styleConfig.options : [];
      const styleLabel = intl.formatMessage({
        id: 'EditListingDetailsForm.styleLabel',
      });
      const stylePlaceholder = intl.formatMessage({
        id: 'EditListingDetailsForm.stylePlaceholder',
      });

      const styleRequired = required(
        intl.formatMessage({
          id: 'EditListingDetailsForm.styleRequired',
        })
      );

      const materialConfig = findConfigForSelectFilter('material', filterConfig);
      const materialSchemaType = materialConfig ? materialConfig.schemaType : null;
      const materials = materialConfig && materialConfig.options ? materialConfig.options : [];
      const materialLabel = intl.formatMessage({
        id: 'EditListingDetailsForm.materialLabel',
      });
      const materialPlaceholder = intl.formatMessage({
        id: 'EditListingDetailsForm.materialPlaceholder',
      });

      const materialRequired = required(
        intl.formatMessage({
          id: 'EditListingDetailsForm.materialRequired',
        })
      );

      const colorConfig = findConfigForSelectFilter('color', filterConfig);
      const colorSchemaType = colorConfig ? colorConfig.schemaType : null;
      const colors = colorConfig && colorConfig.options ? colorConfig.options : [];
      const colorLabel = intl.formatMessage({
        id: 'EditListingDetailsForm.colorLabel',
      });
      const colorPlaceholder = intl.formatMessage({
        id: 'EditListingDetailsForm.colorPlaceholder',
      });

      const colorRequired = required(
        intl.formatMessage({
          id: 'EditListingDetailsForm.colorRequired',
        })
      );

      const roomConfig = findConfigForSelectFilter( 'room', filterConfig);
      const roomSchemaType = roomConfig ? roomConfig.schemaType : null;
      const rooms = roomConfig && roomConfig.options ? roomConfig.options : [];
      const roomLabel = intl.formatMessage({
        id: 'EditListingDetailsForm.roomLabel',
      });
      const roomPlaceholder = intl.formatMessage({
        id: 'EditListingDetailsForm.roomPlaceholder',
      });

      const roomRequired = required(
        intl.formatMessage({
          id: 'EditListingDetailsForm.roomRequired',
        })
      );

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          <FieldTextInput
            id="title"
            name="title"
            className={css.title}
            type="text"
            label={titleMessage}
            placeholder={titlePlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
            autoFocus={autoFocus}
          />
          <FieldTextInput
            id="description"
            name="description"
            className={css.description}
            type="textarea"
            label={descriptionMessage}
            placeholder={descriptionPlaceholderMessage}
            validate={composeValidators(required(descriptionRequiredMessage))}
          />
          <CustomFieldEnum
            id="style"
            name="style"
            options={styles}
            label={styleLabel}
            placeholder={stylePlaceholder}
            validate={styleRequired}
            schemaType={styleSchemaType}
          />

          <CustomFieldEnum
            id="material"
            name="material"
            options={materials}
            label={materialLabel}
            placeholder={materialPlaceholder}
            validate={materialRequired}
            schemaType={materialSchemaType}
          />

          <CustomFieldEnum
            id="color"
            name="color"
            options={colors}
            label={colorLabel}
            placeholder={colorPlaceholder}
            validate={colorRequired}
            schemaType={colorSchemaType}
          />

          <CustomFieldEnum
            id="room"
            name="room"
            options={rooms}
            label={roomLabel}
            placeholder={roomPlaceholder}
            validate={roomRequired}
            schemaType={roomSchemaType}
          />

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingDetailsFormComponent.defaultProps = {
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditListingDetailsFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  filterConfig: propTypes.filterConfig,
};

export default compose(injectIntl)(EditListingDetailsFormComponent);
