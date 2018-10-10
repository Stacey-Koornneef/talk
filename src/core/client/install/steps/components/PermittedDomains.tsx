import { Localized } from "fluent-react/compat";
import React, { StatelessComponent } from "react";
import { Field, Form } from "react-final-form";
import { OnSubmit } from "talk-framework/lib/form";

import {
  Button,
  CallOut,
  Flex,
  FormField,
  HorizontalGutter,
  InputDescription,
  InputLabel,
  TextField,
  Typography,
  ValidationMessage,
} from "talk-ui/components";

import * as styles from "./styles.css";

interface FormProps {
  domains: string;
}

export interface PermittedDomainsForm {
  onSubmit: OnSubmit<FormProps>;
  onGoToPreviousStep: () => void;
  data: {
    domains: string[];
  };
}

const AddOrganization: StatelessComponent<PermittedDomainsForm> = props => {
  return (
    <Form
      onSubmit={props.onSubmit}
      initialValues={{
        domains: props.data.domains.join(","),
      }}
    >
      {({ handleSubmit, submitting, submitError }) => (
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <HorizontalGutter size="double">
            <Localized id="install-permittedDomains-title">
              <Typography variant="heading1" align="center">
                Permitted Domains
              </Typography>
            </Localized>
            <Localized id="install-permittedDomains-description">
              <Typography variant="bodyCopy" align="center">
                Enter the domains you would like to permit for Talk, e.g. your
                local, staging and production environments (ex. localhost:3000,
                staging.domain.com, domain.com).
              </Typography>
            </Localized>

            {submitError && (
              <CallOut color="error" fullWidth>
                {submitError}
              </CallOut>
            )}

            <Field name="domains">
              {({ input, meta }) => (
                <FormField>
                  <Localized id="install-permittedDomains-permittedDomains">
                    <InputLabel>Permitted Domains</InputLabel>
                  </Localized>
                  <Localized id="install-permittedDomains-permittedDomainsDescription">
                    <InputDescription>
                      Insert domains separated by comma
                    </InputDescription>
                  </Localized>
                  <Localized
                    id="install-permittedDomains-permittedDomainsTextField"
                    attrs={{ placeholder: true }}
                  >
                    <TextField
                      name={input.name}
                      onChange={input.onChange}
                      value={input.value}
                      placeholder="Domains"
                      color={
                        meta.touched && (meta.error || meta.submitError)
                          ? "error"
                          : "regular"
                      }
                      disabled={submitting}
                      fullWidth
                    />
                  </Localized>
                  {meta.touched &&
                    (meta.error || meta.submitError) && (
                      <ValidationMessage fullWidth>
                        {meta.error || meta.submitError}
                      </ValidationMessage>
                    )}
                </FormField>
              )}
            </Field>

            <Flex direction="row-reverse" itemGutter>
              <Localized id="install-finishInstall">
                <Button
                  variant="filled"
                  color="primary"
                  size="large"
                  type="submit"
                  disabled={submitting}
                >
                  Finish Install
                </Button>
              </Localized>
              <Localized id="install-back">
                <Button
                  onClick={props.onGoToPreviousStep}
                  variant="filled"
                  color="regular"
                  size="large"
                  disabled={submitting}
                >
                  Back
                </Button>
              </Localized>
            </Flex>
          </HorizontalGutter>
        </form>
      )}
    </Form>
  );
};

export default AddOrganization;
