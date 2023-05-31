import { useState } from "react";
import styles from "../../styles/styles";
import { AiOutlineRight } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
const Faq = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    if (activeTab === tab) {
      setActiveTab(0);
    } else {
      setActiveTab(tab);
    }
  };
  return (
    <div>
      <div className={`${styles.section} my-8 `}>
        <h2 className={`${styles.heading} 800px:mt-0 mt-12`}>FAQ</h2>

        <div className="mx-auto space-y-4">
          {/* single faq */}
          <div className="border-b border-gray-200 pb-4">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => toggleTab(1)}
            >
              <span className="text-lg font-[500] text-gray-900">
                {" "}
                How do I track my order
              </span>
              {activeTab === 1 ? (
                <RxCross2 size={20} />
              ) : (
                <AiOutlineRight size={20} />
              )}
            </button>
            {activeTab === 1 && (
              <div className="mt-4">
                <p className="text-gray-900">
                  We usually deliver your products within 1-2 days but it can
                  take additional 3-7 days depending on your location.
                </p>
              </div>
            )}
          </div>

          <div className="border-b border-gray-200 pb-4">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => toggleTab(2)}
            >
              <span className="text-lg font-[500] text-gray-900">
                {" "}
                How do I track my order
              </span>
              {activeTab === 2 ? (
                <RxCross2 size={20} />
              ) : (
                <AiOutlineRight size={20} />
              )}
            </button>
            {activeTab === 2 && (
              <div className="mt-4">
                <p className="text-gray-900">
                  We usually deliver your products within 1-2 days but it can
                  take additional 3-7 days depending on your location.
                </p>
              </div>
            )}
          </div>
          <div className="border-b border-gray-200 pb-4">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => toggleTab(3)}
            >
              <span className="text-lg font-[500] text-gray-900">
                {" "}
                How do I track my order
              </span>
              {activeTab === 1 ? (
                <RxCross2 size={20} />
              ) : (
                <AiOutlineRight size={20} />
              )}
            </button>
            {activeTab === 3 && (
              <div className="mt-4">
                <p className="text-gray-900">
                  We usually deliver your products within 1-2 days but it can
                  take additional 3-7 days depending on your location.
                </p>
              </div>
            )}
          </div>

          <div className="border-b border-gray-200 pb-4">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => toggleTab(4)}
            >
              <span className="text-lg font-[500] text-gray-900">
                {" "}
                How do I track my order
              </span>
              {activeTab === 4 ? (
                <RxCross2 size={20} />
              ) : (
                <AiOutlineRight size={20} />
              )}
            </button>
            {activeTab === 4 && (
              <div className="mt-4">
                <p className="text-gray-900">
                  We usually deliver your products within 1-2 days but it can
                  take additional 3-7 days depending on your location.
                </p>
              </div>
            )}
          </div>

          <div className="border-b border-gray-200 pb-4">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => toggleTab(5)}
            >
              <span className="text-lg font-[500] text-gray-900">
                {" "}
                How do I track my order
              </span>
              {activeTab === 5 ? (
                <RxCross2 size={20} />
              ) : (
                <AiOutlineRight size={20} />
              )}
            </button>
            {activeTab === 5 && (
              <div className="mt-4">
                <p className="text-gray-900">
                  We usually deliver your products within 1-2 days but it can
                  take additional 3-7 days depending on your location.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Faq;
