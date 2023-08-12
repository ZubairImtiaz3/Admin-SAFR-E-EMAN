"use client";
import Link from "next/link";
import LoginForm from "@/components/partials/auth/login-form";
import useDarkMode from "@/hooks/useDarkMode";

// image import

const Login = () => {
  const [isDark] = useDarkMode();
  return (
    <>
      <div className="loginwrapper">
        <div className="lg-inner-column">
          <div className="right-column relative">
            <div className="inner-content login-content h-full flex flex-col dark:bg-slate-800">
              <div className="auth-box h-full flex flex-col justify-center">
                {/* <div className="mobile-logo text-center mb-6 lg:hidden block">
                  <Link href="/">
                    <img
                      src={
                        isDark
                          ? "/assets/images/icon/logo-safr.svg"
                          : "/assets/images/icon/logo-safr.svg"
                      }
                      alt=""
                      className="mx-auto"
                    />
                  </Link>
                </div> */}
                <div className="text-center 2xl:mb-10 mb-4">
                  <h4 className="font-medium">Sign in</h4>
                  <div className="text-[#5E5E5E] text-base">
                    Sign in to your SAFR-E-EMAN admin account
                  </div>
                </div>
                <LoginForm />
                <div className="mt-6 flex justify-between items-center">
                  <div className="w-[35%] h-[1px] bg-[#5E5E5E] opacity-[0.25]"></div>
                  <div className="inline-block text-center dark:bg-slate-800 dark:text-slate-400 min-w-max text-sm text-[#5E5E5E] font-normal px-4">
                    Or continue with
                  </div>
                  <div className="w-[35%] h-[1px] bg-[#5E5E5E] opacity-[0.25]"></div>
                </div>
                <div className="max-w-[242px] mx-auto mt-4 w-full">
                  <div className="flex justify-center">
                    <a
                      href="#"
                      className="inline-flex h-10 w-10 bg-[#efbd69] text-white text-2xl flex-col items-center justify-center rounded-full"
                    >
                      <img src="/assets/images/icon/gp.svg" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
