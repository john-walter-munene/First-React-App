// Using and providing context from the same component.
import { Heading } from "./NewHeading";
import { Section } from "./NewSection";
import { UpdatedSection } from "./NewSection";

function Page() {
    return(
        <Section>
            <Heading>Title</Heading>
            <Section>
                <Heading>Heading</Heading>
                <Heading>Heading</Heading>
                <Heading>Heading</Heading>
                <Section>
                    <Heading>Sub-heading</Heading>
                    <Heading>Sub-heading</Heading>
                    <Heading>Sub-heading</Heading>
                    <Section>
                        <Heading>Sub-sub-heading</Heading>
                        <Heading>Sub-sub-heading</Heading>
                        <Heading>Sub-sub-heading</Heading>
                    </Section>
                </Section>
            </Section>
        </Section>
    );
}

export { Page };

// Context passes through intermediate components.
function ProfilePage() {
  return (
    <UpdatedSection>
      <Heading>My Profile</Heading>
      <Post title="Hello traveller!" body="Read about my adventures."/>
      <AllPosts />
    </UpdatedSection>
  );
}

function AllPosts() {
  return (
    <UpdatedSection>
      <Heading>Posts</Heading>
      <RecentPosts />
    </UpdatedSection>
  );
}

function RecentPosts() {
  return (
    <UpdatedSection>
      <Heading>Recent Posts</Heading>
      <Post title="Flavors of Lisbon" body="...those pastéis de nata!"/>
      <Post title="Buenos Aires in the rhythm of tango" body="I loved it!" />
    </UpdatedSection>
  );
}

function Post({ title, body }) {
  return (
    <UpdatedSection isFancy={true}>
      <Heading>{title}</Heading>
      <p><i>{body}</i></p>
    </UpdatedSection>
  );
}

export { ProfilePage };