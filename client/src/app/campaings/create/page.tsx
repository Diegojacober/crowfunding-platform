"use client";

import { money } from "@public/assets";
import React, {
  FormEventHandler,
  InputHTMLAttributes,
  useContext,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton";
import { checkIfImage } from "@/utils";
import FormField from "@/components/FormField";
import Image from "next/image";
import { StateContext } from "@/components/state-provider";
import { useActiveAccount } from "thirdweb/react";

function CreateCampaingn() {
  const router = useRouter();
  const { publishCampaing } = useContext(StateContext);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const account = useActiveAccount();
  const [form, setform] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleFormFieldChange = (
    fieldName: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setform({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);

    setform({
      name: "",
      title: "",
      description: "",
      target: "",
      deadline: "",
      image: "",
    });

    const resp = publishCampaing(form, account!);
    console.log("response from request to insert at contract: ", resp);
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && "Loader..."}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your name *"
            placeholder={"John Doe"}
            inputType="text"
            value={form.name}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFormFieldChange("name", e)
            }
          />

          <FormField
            labelName="Campaign Title *"
            placeholder={"Write a title"}
            inputType="text"
            value={form.title}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFormFieldChange("title", e)
            }
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder={"Write your story"}
          isTextArea={true}
          value={form.description}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFormFieldChange("description", e)
          }
        />

        <div className="w-full flex justify-center items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <Image
            src={money}
            alt="Banner"
            priority={true}
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] ml-20px">
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder={"ETH 0.50"}
            inputType="number"
            value={form.target}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFormFieldChange("target", e)
            }
          />

          <FormField
            labelName="End Date *"
            placeholder={"End date"}
            inputType="date"
            value={form.deadline}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFormFieldChange("deadline", e)
            }
          />
        </div>

        <FormField
          labelName="Campaign image *"
          placeholder={"Place image URL of your campaign"}
          inputType="url"
          value={form.image}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFormFieldChange("image", e)
          }
        />

        <div className="flex justify-center items-center mt-[28px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071] p-3"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateCampaingn;
