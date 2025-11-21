// components/HashtagsInput.jsx
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import useGenerateAiBasedContent from "../../../../hooks/useGenerateAiBasedContent";

const HashtagsInput = ({ hashtags, onChange,title }) => {

    const [input, setInput] = useState("");

    const HandleAddHashtag = () => {
        console.log(input)
        let tag = input.trim();
        if (!tag) return;

        if (!tag.startsWith("#")) tag = "#" + tag;

        if (!hashtags.includes(tag)) {
        onChange([...hashtags, tag]);
        }

        setInput("");
    };

    const HandleRemoveTag = (tag) => {
        onChange(hashtags.filter((t) => t !== tag));
    };

    const HandleKey = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            HandleAddHashtag();
        }
    };

    /** Ai Hook */
    const {HandleGenerateAiBasedContent,Data} = useGenerateAiBasedContent();

    /** Content genrating with ai */
    const HandleClickGenerateAi = async () => {
        try {
            const AiBasedContentPayload = {
                title:title
            };
            const isGenerateType = "hashtags";
            const response = await HandleGenerateAiBasedContent(AiBasedContentPayload,isGenerateType);
        } catch (e) {
            setError(e);
        }
    };

    // These useEffect using for Error Handling
    useEffect( () => {
        if(Data.Content && Data.Content.isArray){
            console.log(Data.Content);
            hashtags.push(Data.Content);
        }
    },[Data.Content])

    // If any error to show on console
    if(Data.AiBasedError !== null){
        console.log(Data.AiBasedError);
    }

  return (
    <div className="border rounded-md p-3 min-h-[80px] relative !mb-8">
        <div className="flex gap-2 flex-wrap mb-3">
            {hashtags.map((tag, i) => (
                <span
                    key={i}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded flex items-center text-xs"
                >
                    {tag}
                    <button onClick={() => HandleRemoveTag(tag)} className="ml-1">
                        <X size={12} />
                    </button>
                </span>
            ))}
        </div>

        <input
            className="outline-none w-full text-sm"
            placeholder="Type a hashtag & press Enter"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={HandleKey}
        />
        <button className='bg-[#edeff3] !p-1 absolute bottom-2 right-2 cursor-pointer text-sm' onClick={HandleClickGenerateAi} disabled={Data.AiBasedLoading}>{Data.AiBasedLoading ? "Generating..." : "Generate With AI"}</button>
    </div>
  );
}

export default HashtagsInput;