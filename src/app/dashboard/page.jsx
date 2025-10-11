import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "../../../utils/auth";
import Form from "../components/Form";
import User from "../../../models/User";
import connectDB from "../../../utils/connectDB";
import Link from "next/link";

export default async function page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const secretKey = process.env.SECRET_KEY;

  if (!token) {
    redirect("/signin");
  }

  let userData = null;

  try {
    await connectDB()

    const result = verifyToken(token, secretKey);

    if (result && result.email) {
      const user = await User.findOne({ email: result.email }).select('name lastName email').lean();

      if (user) {
        userData = {
          name: user.name || "",
          lastName: user.lastName || "",
          email: user.email || "",
        };
      } else {
        redirect("/signin");
      }
    } else {
      redirect("/signin");
    }
  } catch (error) {
    console.error("Error in Dashboard Server Component:", error);
    redirect("/signin");
  }

  const dashboardClasses = "min-h-screen bg-gray-900 text-white p-8";
  const cardClasses =
    "bg-gray-800 p-6 rounded-xl shadow-lg max-w-4xl mx-auto space-y-6";
  const headerClasses =
    "text-4xl font-extrabold text-blue-400";
  const welcomeMessageClasses = "text-lg text-gray-300";
  const detailClasses =
    "bg-gray-700 p-3 rounded-lg font-mono text-sm break-all";

  if (userData) {
    return (
      <div className={dashboardClasses}>
        <div className={cardClasses}>
          <div className="flex justify-between border-b border-gray-700 pb-3 mb-6">
            <h2 className={headerClasses}>Dashboard</h2>
            <Link href={'/'} className="text-xl text-blue-400">Back</Link>
          </div>

          <p className={welcomeMessageClasses}>
            Welcome, you have been successfully authenticated.
          </p>

          <div className={detailClasses}>
            Your Email: {userData.email || "Uncertain"}
          </div>

          <hr className="border-gray-700 my-6" />

          <h3 className="text-2xl font-semibold text-gray-200">
            Information and settings
          </h3>
          <Form initialData={userData} />
        </div>
      </div>
    );
  }

  redirect("/signin");
}