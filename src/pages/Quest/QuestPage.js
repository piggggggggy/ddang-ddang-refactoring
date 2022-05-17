import { Container } from "../../elements";
import LocalQuestSummary from "../Main/components/LocalQuestSummary";
import BackArrowGnb from "../../components/BackArrowGnb";
import { useMainData } from "../Main/hooks/MainHooks";

export default function QuestPage() {
  const {
    questList,
    loading,
    location,
  } = useMainData();

  return (
    <Container>
      <BackArrowGnb/>
      <LocalQuestSummary
        questList={questList}
        location={location}
        isQuestPage
      />      
    </Container>
  )
}