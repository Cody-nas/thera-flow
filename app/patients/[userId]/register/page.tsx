import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getUser } from "@/lib/actions/patient.action";
import RegisterForm from "@/components/forms/RegisterForm";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-[860px]">
          <Image
            src="/assets/images/thera_logo.png"
            alt="patient"
            width={1000}
            height={1000}
            className="mb-12 h-10  w-fit"
          />

          <RegisterForm user={user} />
          <p className="copyright py-12">© 2025 TheraFlow</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        alt="patient"
        width={1000}
        height={1000}
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
