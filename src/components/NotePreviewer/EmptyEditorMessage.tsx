import { useDeviceOS } from "@/utils/hooks/useDeviceOS";

import { Flex, FlexColumn } from "@/styles/layout";
import { KBD, LargeText } from "@/styles/typography";

export const EmptyEditorMessage = () => {
  const { ctrlKey, altKey } = useDeviceOS();

  return (
    <FlexColumn bg="firstLayer" gap={10} height="100%" justifyContent="center" alignItems="center">
      <LargeText>Create a new note</LargeText>
      <Flex justifyContent="center" gap={5}>
        <KBD>{ctrlKey}</KBD> + <KBD>{altKey}</KBD> + <KBD>N</KBD>
      </Flex>
    </FlexColumn>
  );
};
