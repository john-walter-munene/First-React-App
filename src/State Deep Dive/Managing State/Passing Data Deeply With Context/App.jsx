import { Section } from "./Section";
import { Heading } from "./Heading";

import { UpdatedSection } from "./Section";
import { UpdatedHeading } from "./Heading";

function Page() {
    return (
        <Section>
            <Heading level={1}>Title</Heading>
            <Heading level={2}>Heading</Heading>
            <Heading level={3}>Sub-heading</Heading>
            <Heading level={4}>Sub-sub-heading</Heading>
            <Heading level={5}>Sub-sub-sub-heading</Heading>
            <Heading level={6}>Sub-sub-sub-sub-heading</Heading>
        </Section>
    );
}

export { Page };

// Let’s say you want multiple headings within the same Section to always have the same size:
function NewPage() {
  return (
    <Section>
      <Heading level={1}>Title</Heading>
      <Section>
        <Heading level={2}>Heading</Heading>
        <Heading level={2}>Heading</Heading>
        <Heading level={2}>Heading</Heading>
        <Section>
          <Heading level={3}>Sub-heading</Heading>
          <Heading level={3}>Sub-heading</Heading>
          <Heading level={3}>Sub-heading</Heading>
          <Section>
            <Heading level={4}>Sub-sub-heading</Heading>
            <Heading level={4}>Sub-sub-heading</Heading>
            <Heading level={4}>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}

export { NewPage };

// Using the context.
function UpdatedPage() {
    return (
        <UpdatedSection level={1}>
            <UpdatedHeading>Title</UpdatedHeading>
            <UpdatedSection level={2}>
                <UpdatedHeading>Heading</UpdatedHeading>
                <UpdatedHeading>Heading</UpdatedHeading>
                <UpdatedHeading>Heading</UpdatedHeading>
                <UpdatedSection level={3}>
                    <UpdatedHeading>Sub-heading</UpdatedHeading>
                    <UpdatedHeading>Sub-heading</UpdatedHeading>
                    <UpdatedHeading>Sub-heading</UpdatedHeading>
                    <UpdatedSection level={4}>
                        <UpdatedHeading>Sub-sub-heading</UpdatedHeading>
                        <UpdatedHeading>Sub-sub-heading</UpdatedHeading>
                        <UpdatedHeading>Sub-sub-heading</UpdatedHeading>
                    </UpdatedSection>
                </UpdatedSection>
            </UpdatedSection>
        </UpdatedSection>
    );
}

export { UpdatedPage };