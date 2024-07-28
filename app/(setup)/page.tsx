import { db } from '@/lib/db';
import { initalProfile } from '@/lib/inital-profile';
import { redirect } from 'next/navigation';

const SetupPage = async () => {
  // 初始化用户
  const profile = await initalProfile();
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <div>Create a Server</div>;
};

export default SetupPage;
