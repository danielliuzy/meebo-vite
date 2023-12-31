import OpenAI from "openai";
import { ClipLoader } from "react-spinners";

type Props = {
  name: string;
  score: number;
  max?: number;
  unit?: string;
  widget?: Widget;
  loading?: boolean;
  setScore?: (score: number) => void;
  setMessage?: (message: string) => void;
  setLoading?: (show: boolean) => void;
};

type Widget = "FILE";

export const StatusRow = ({
  name,
  score,
  max = 1,
  unit,
  widget,
  loading,
  setScore,
  setMessage,
  setLoading,
}: Props) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-row items-center space-x-2">
        <div>
          {score / max > 0.66 ? "🟢" : score / max > 0.33 ? "🟡" : "🔴"}
        </div>
        <div className="text-lg font-semibold">{name}</div>
      </div>
      {widget == null ? (
        <div className="flex flex-row space-x-1 items-end">
          <div className="text-xl font-semibold">{score}</div>
          <div className="text-md">{unit}</div>
        </div>
      ) : (
        <label className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 hover:cursor-pointer">
          <input
            className="hidden"
            type="file"
            onChange={async (e) => {
              if (e.target.files == null || e.target.files.length < 1) {
                return;
              }

              const openai = new OpenAI({
                apiKey: import.meta.env.VITE_OPENAI_API_KEY,
                dangerouslyAllowBrowser: true,
              });

              const file = e.target.files[0];
              const reader = new FileReader();
              reader.readAsDataURL(file);
              setLoading?.(true);
              reader.onload = async () => {
                const imageData = reader.result;
                if (imageData == null) {
                  return;
                }
                const response = await openai.chat.completions.create({
                  model: "gpt-4-vision-preview",
                  messages: [
                    {
                      role: "user",
                      content: [
                        {
                          type: "text",
                          text: 'Give a score out of 10 based on healthiness given a picture of a meal and the recommendation for a healthy next meal in the following JSON format: {"score": score, "nextMeal": nextMeal}. Keep the "nextMeal" field less than 24 characters and try to make it funny',
                        },
                        {
                          type: "image_url",
                          image_url: {
                            url: reader.result as string,
                          },
                        },
                      ],
                    },
                  ],
                });
                if (response.choices[0].message.content == null) {
                  return;
                }
                let responseContent = response.choices[0].message.content;
                if (!responseContent.endsWith('"}')) {
                  responseContent = responseContent + '"}';
                }
                if (!responseContent.startsWith("{")) {
                  responseContent = responseContent.substring(
                    responseContent.indexOf("{")
                  );
                }
                const { score, nextMeal } = JSON.parse(responseContent) as {
                  score: number;
                  nextMeal: string;
                };
                setLoading?.(false);
                setScore?.(score);
                setMessage?.(nextMeal.toLowerCase());
                return;
              };

              return;
            }}
          />
          {loading ? <ClipLoader size={24} /> : "📷"}
        </label>
      )}
    </div>
  );
};
