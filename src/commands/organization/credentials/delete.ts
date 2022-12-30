import { Command } from "@oclif/core";
import { gql, gqlRequest } from "../../../graphql";

export default class DeleteCommand extends Command {
  static description = "Delete an Organization Credential";
  static args = [
    {
      name: "credential",
      required: true,
      description: "ID of the credential to delete",
    },
  ];

  async run() {
    const {
      args: { credential },
    } = await this.parse(DeleteCommand);

    await gqlRequest({
      document: gql`
        mutation deleteCredential($id: ID!) {
          deleteCredential(input: { id: $id }) {
            credential {
              id
            }
            errors {
              field
              messages
            }
          }
        }
      `,
      variables: {
        id: credential,
      },
    });
  }
}
