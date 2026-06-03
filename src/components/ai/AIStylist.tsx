"use client";

import {
  Sparkles,
  X,
  Send,
  ImagePlus,
  Mic
} from "lucide-react";

import {
  motion,
  AnimatePresence
} from "framer-motion";

import {
  useState
} from "react";

interface Message {

  role: "user" | "assistant";

  content: string;

}

export default function AIStylist() {

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [listening, setListening] =
    useState(false);

  const [messages, setMessages] =
    useState<Message[]>([
      {
        role: "assistant",
        content:
          "Hello ✨ I’m Aira, your luxury saree stylist. Ask me for bridal looks, festive collections, styling advice, or upload inspiration images."
      }
    ]);

  const [input, setInput] =
    useState("");

  const [image, setImage] =
    useState<File | null>(null);

  // VOICE RECOGNITION

  function startListening() {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert(
        "Voice recognition not supported in this browser."
      );

      return;

    }

    const recognition =
      new SpeechRecognition();

    recognition.lang =
      "en-US";

    recognition.start();

    setListening(true);

    recognition.onresult =
      (event: { results: { transcript: string }[][] }) => {

        const transcript =
          event.results[0][0]
          .transcript;

        setInput(transcript);

      };

    recognition.onend = () => {

      setListening(false);

    };

  }

  // SEND MESSAGE

  async function sendMessage() {

    if (
      !input.trim() &&
      !image
    ) return;

    const userMessage: Message = {

      role: "user",

      content:
        input ||
        "Uploaded an inspiration image."

    };

    // ADD USER MESSAGE

    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    const currentInput =
      input;

    setInput("");

    try {

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "prompt",
        currentInput
      );

      if (image) {

        formData.append(
          "image",
          image
        );

      }

      const response =
        await fetch(
          "/api/ai",
          {

            method: "POST",

            body: formData

          }
        );

      const data =
        await response.json();

      const aiMessage: Message = {

        role: "assistant",

        content:
          data.message ||
          "Luxury recommendations are being curated for you."

      };

      setMessages((prev) => [
        ...prev,
        aiMessage
      ]);

      setImage(null);

    } catch (error) {

      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong while curating your luxury recommendations."
        }
      ]);

    } finally {

      setLoading(false);

    }

  }

  return (

    <>

      {/* FLOATING BUTTON */}

      <motion.button

        whileHover={{
          scale: 1.1
        }}

        whileTap={{
          scale: 0.95
        }}

        onClick={() =>
          setOpen(true)
        }

        className="
          fixed
          bottom-4
          right-4
          sm:bottom-8
          sm:right-8
          z-[90]
          bg-[#9b174c]
          text-white
          p-3
          sm:p-5
          rounded-full
          shadow-2xl
        "
      >

        <Sparkles size={22} className="sm:w-7 sm:h-7" />

      </motion.button>

      {/* PANEL */}

      <AnimatePresence>

        {

          open && (

            <motion.div

              initial={{
                opacity: 0,
                y: 100
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              exit={{
                opacity: 0,
                y: 100
              }}

              transition={{
                duration: 0.4
              }}

              className="
                fixed
                inset-0
                sm:inset-auto
                sm:bottom-8
                sm:right-8
                z-[100]
                w-full
                sm:w-[400px]
                h-full
                sm:h-[650px]
                bg-white
                rounded-none
                sm:rounded-[40px]
                shadow-2xl
                overflow-hidden
                flex
                flex-col
              "
            >

              {/* HEADER */}

              <div
                className="
                  bg-black
                  text-white
                  px-5
                  sm:px-8
                  py-4
                  sm:py-6
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <h2 className="text-2xl font-black">
                    Aira Stylist
                  </h2>

                  <p className="text-white/60 text-sm mt-1">
                    AI luxury fashion assistant
                  </p>

                </div>

                <button
                  onClick={() =>
                    setOpen(false)
                  }
                >

                  <X size={26} />

                </button>

              </div>

              {/* CHAT */}

              <div
                className="
                  flex-1
                  overflow-y-auto
                  p-6
                  space-y-6
                  bg-[#f8f5f0]
                "
              >

                {

                  messages.map((message, index) => (

                    <div

                      key={index}

                      className={`
                        flex

                        ${
                          message.role === "user"
                          ?
                          "justify-end"
                          :
                          "justify-start"
                        }
                      `}
                    >

                      <div
                        className={`
                          max-w-[85%]
                          px-5
                          py-4
                          rounded-3xl
                          text-sm
                          leading-7
                          whitespace-pre-wrap

                          ${
                            message.role === "user"
                            ?
                            "bg-[#9b174c] text-white"
                            :
                            "bg-white text-black shadow-sm"
                          }
                        `}
                      >

                        {message.content}

                      </div>

                    </div>

                  ))

                }

                {/* LOADING */}

                {

                  loading && (

                    <div className="flex justify-start">

                      <div
                        className="
                          bg-white
                          px-5
                          py-4
                          rounded-3xl
                          shadow-sm
                          text-sm
                        "
                      >

                        Aira is curating luxury recommendations...

                      </div>

                    </div>

                  )

                }

              </div>

              {/* INPUT AREA */}

              <div
                className="
                  border-t
                  p-5
                  space-y-4
                  bg-white
                "
              >

                {/* IMAGE UPLOAD */}

                <label
                  className="
                    flex
                    items-center
                    gap-3
                    text-sm
                    text-gray-500
                    cursor-pointer
                  "
                >

                  <ImagePlus size={18} />

                  {

                    image
                    ?
                    image.name
                    :
                    "Upload Inspiration Image"

                  }

                  <input

                    type="file"

                    accept="image/*"

                    hidden

                    onChange={(e) => {

                      const file =
                        e.target.files?.[0];

                      if (file) {

                        setImage(file);

                      }

                    }}

                  />

                </label>

                {/* INPUT ROW */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  {/* TEXT INPUT */}

                  <input

                    value={input}

                    onChange={(e) =>
                      setInput(
                        e.target.value
                      )
                    }

                    onKeyDown={(e) => {

                      if (
                        e.key === "Enter"
                      ) {

                        sendMessage();

                      }

                    }}

                    placeholder="
Ask your stylist...
"

                    className="
                      flex-1
                      border
                      border-gray-200
                      rounded-full
                      px-5
                      py-3
                      outline-none
                      text-sm
                    "
                  />

                  {/* VOICE BUTTON */}

                  <button

                    onClick={startListening}

                    className={`
                      p-3
                      rounded-full
                      transition

                      ${
                        listening
                        ?
                        "bg-red-500 text-white"
                        :
                        "bg-gray-100 text-black"
                      }
                    `}
                  >

                    <Mic size={18} />

                  </button>

                  {/* SEND BUTTON */}

                  <button

                    onClick={sendMessage}

                    disabled={loading}

                    className="
                      bg-[#9b174c]
                      text-white
                      p-3
                      rounded-full
                      disabled:opacity-50
                    "
                  >

                    <Send size={18} />

                  </button>

                </div>

              </div>

            </motion.div>

          )

        }

      </AnimatePresence>

    </>

  );

}