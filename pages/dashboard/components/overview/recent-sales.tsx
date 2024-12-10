import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function RecentSales({ data }) {
  return (
    <div className="space-y-8 overflow-auto">
      {data?.map((user) => (
        <div key={user.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
              alt="Avatar"
            />
            <AvatarFallback>{user.avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.user.firstName} {user.user.lastName}
            </p>
            <p className="text-sm text-muted-foreground">
              Địa chỉ: {user.user.address}
            </p>
          </div>
          <div className="ml-auto font-medium">
            <p>Số điểm: {user.rewardPoints}</p>
            <p className="text-green-400">{user.rank}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
