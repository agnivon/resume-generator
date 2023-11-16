"use client";

import Button, { ButtonColor, ButtonSize } from "@/components/global/Button";
import Card from "@/components/global/Card";
import { Routes } from "@/constants/routes.constants";
import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import { Google } from "react-bootstrap-icons";
import BrandLogo from "../brand/BrandLogo";

export default function SignInCard({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null;
}) {
  return (
    <>
      {providers && (
        <div>
          <Card>
            <div>
              <BrandLogo iconDimensions={40} textClasses="text-2xl"/>
            </div>
            {Object.values(providers).map((provider) => (
              <div key={provider.name} className="w-full">
                <Button
                  label={<>Sign in with {provider.name}</>}
                  onClick={() =>
                    signIn(provider.id, { callbackUrl: Routes.HOME })
                  }
                  color={ButtonColor.LIGHT}
                  size={ButtonSize.LARGE}
                  Icon={Google}
                  customClassNames="w-full"
                />
              </div>
            ))}
          </Card>
        </div>
      )}
    </>
  );
}
