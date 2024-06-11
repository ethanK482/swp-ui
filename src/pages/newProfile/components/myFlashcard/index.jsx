import Loading from "../../../../components/loading";
import useAllFlashCard from "../../../../hook/flashcard/useAllFlashCard";
import useUserInfo from "../../../../hook/user/useUserInfo";
import FlashCard from "../../../flashcard/components/FlashCard";
import MyLearningStyle from "../myLearning/MylearningStyle";

const MyFlashCard = () => {
  const user = useUserInfo();
  const flashcards = useAllFlashCard()?.filter(
    (flashcard) => flashcard.userId == user?.id
  );
  const numOfFlashcard = flashcards?.length;
  return (
    !!numOfFlashcard &&
    (flashcards ? (
      <MyLearningStyle>
        <div className="my-learning">
          <div className="my-learning_heading">
            <p className="my-learning_heading__title">My Flashcards</p>
          </div>
          <div className="my-learning_courses">
            {flashcards?.map((flashcard) => (
              <FlashCard key={flashcard.id} flashcard={flashcard} />
            ))}
          </div>
        </div>
      </MyLearningStyle>
    ) : (
      <Loading />
    ))
  );
};
export default MyFlashCard;
