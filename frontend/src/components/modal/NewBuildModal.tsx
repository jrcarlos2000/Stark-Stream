import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
export default function NewBuildModal({ setIsOpen }: { setIsOpen: any }) {
  return (
    <Wrapper>
      <TitleContainer>
        <Title>Modal</Title>
        <CancelButton>
          <AiOutlineClose
            onClick={() => {
              setIsOpen(false);
            }}
          />
        </CancelButton>
      </TitleContainer>
      <SectionContainer>
        <SectionTitle>name</SectionTitle>
        <SectionInput placeholder="name" />
      </SectionContainer>
      <Button>Submit</Button>
    </Wrapper>
  );
}
const Wrapper = styled.div``;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.p``;

const CancelButton = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const SectionContainer = styled.div``;

const SectionTitle = styled.p``;

const SectionInput = styled.input``;

const Button = styled.button`
  &:hover {
    cursor: pointer;
  }
`;
