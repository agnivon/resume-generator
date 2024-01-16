"use client";

import Button, { ButtonColor } from "@/components/global/Button";
import Card from "@/components/global/Card";
import { Routes } from "@/constants/routes.constants";
import { getProviders, signIn } from "next-auth/react";
import { Github, Google } from "react-bootstrap-icons";
import BrandLogo from "../brand/BrandLogo";

export default function SignInCard(_props: {
  providers: Awaited<ReturnType<typeof getProviders>>;
}) {
  // const [email, setEmail] = React.useState<string>("");
  return (
    <>
      <div>
        <Card>
          <div className="flex justify-center">
            <BrandLogo iconDimensions={40} textClasses="text-2xl" />
          </div>
          <div className="w-full space-y-6">
            {/* {providers &&
              Object.values(providers)?.map((provider) => {
                return (
                  <Button
                    key={provider.id}
                    label={<>Sign in with {provider.name}</>}
                    onClick={() =>
                      signIn(provider.id, { callbackUrl: Routes.HOME })
                    }
                    color={ButtonColor.LIGHT}
                    //size={ButtonSize.LARGE}
                    Icon={provider.id === "github" ? Github : Google}
                    customClassNames="w-full"
                  />
                );
              })} */}
            <Button
              label={<>Sign in with Google</>}
              onClick={() => signIn("google", { callbackUrl: Routes.RESUMES })}
              color={ButtonColor.LIGHT}
              //size={ButtonSize.LARGE}
              Icon={Google}
              customClassNames="w-full"
            />
            <Button
              label={<>Sign in with Github</>}
              onClick={() => signIn("github", { callbackUrl: Routes.RESUMES })}
              color={ButtonColor.LIGHT}
              //size={ButtonSize.LARGE}
              Icon={Github}
              customClassNames="w-full"
            />
            {/* <div>
              <Input
                label="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                label={<>Sign in with Email</>}
                onClick={() =>
                  signIn("email", { email, callbackUrl: Routes.HOME })
                }
                color={ButtonColor.LIGHT}
                //size={ButtonSize.LARGE}
                Icon={At}
                customClassNames="w-full"
              />
            </div> */}
          </div>
        </Card>
      </div>
    </>
  );
}
