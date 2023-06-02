import { Inngest, NonRetriableError } from "inngest";
import { serve } from "inngest/next";

export const inngest = new Inngest({
  name: "NonRetriableError",
  eventKey: "test",
});

const test = inngest.createFunction(
  { name: "Test" },
  { event: "test" },
  async ({ step }) => {
    await step.run("test", () => {
      throw new NonRetriableError("Should not retry");
    });
  }
);

export default serve(inngest, [test]);
