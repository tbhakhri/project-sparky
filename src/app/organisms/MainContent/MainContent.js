import "./MainContent.css";
import ChatBubble from "@/molecules/ChatBubble/ChatBubble";
import ModelBubble from "@/molecules/ChatBubble/ModelBubble";
import ImageBubble from "@/molecules/ChatBubble/ImageBubble";
import { useData } from "%/DataContext";
import DefaultScreen from "@/molecules/DefaultScreen/DefaultScreen";

export default function MainContent() {
  const { isResponseLoading, currentPrompt, setCurrentVariant, copyVariant } =
    useData();

  const renderBubble = (item, requestIndex, variantIndex) => {
    switch (item.type) {
      case "text":
        return (
          <ChatBubble
            initialText={item.text}
            index={requestIndex}
            variant={variantIndex}
          />
        );
      case "image":
        return (
          <ImageBubble
            imageURL={item.text}
            index={requestIndex}
            variant={variantIndex}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mainContentContainer">
      {currentPrompt.variants.length === 1 &&
      currentPrompt.variants[0].currentRequests.length === 0 ? (
        <>
          <div className="defaultScreenContainer">
            <DefaultScreen />
          </div>
        </>
      ) : (
        <>
          {currentPrompt.variants.map((variant, variantIndex) => (
            <div
              key={variantIndex}
              className="variantContainer"
              style={{
                borderColor:
                  variantIndex === currentPrompt.currentVariant
                    ? "#a5bcf6"
                    : "rgba(0,0,0,0)",
              }}
              onClick={() => setCurrentVariant(variantIndex)}
            >
              <p className="userText">User</p>
              {variant.currentRequests.map((item, requestIndex) =>
                renderBubble(item, requestIndex, variantIndex)
              )}
              {isResponseLoading && (
                <>
                  <div className="loading-dots"></div>
                </>
              )}
              {variant.currentResponses.length > 0 && (
                <ModelBubble variant={variantIndex} />
              )}
              <button
                className="compareButton"
                onClick={(_) => copyVariant(variantIndex)}
                disabled={currentPrompt.variants.length >= 3}
                style={{
                  backgroundColor: currentPrompt.variants.length >= 3 && "grey",
                }}
              >
                {currentPrompt.variants.length >= 3
                  ? "Max 3 Variants"
                  : "Compare"}
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
