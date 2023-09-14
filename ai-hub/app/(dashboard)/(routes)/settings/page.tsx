import { Settings } from "lucide-react";
import { UserButton } from '@clerk/nextjs';
import { Heading } from "@/components/ui/heading";
// import { SubscriptionButton } from "@/components/ui/subscription-button";
// import { checkSubscription } from "@/lib/subscription";

const SettingsPage = async () => {
  //const isPro = await checkSubscription();
  return ( 
    <div>
      <Heading
        title="Settings"
        description="Manage your account settings."
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        Manage your account by clicking on your profile below 👇
        <br/>
        <div className="flex w-full justify-start">
            <UserButton afterSignOutUrl='/'/>
        </div>
      </div>
    </div>
   );
}
 
export default SettingsPage;