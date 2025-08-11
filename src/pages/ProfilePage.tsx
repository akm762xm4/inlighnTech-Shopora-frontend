import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import OrderSummaryCard from "../components/OrderSummaryCard";
import { useGetAllOrdersQuery } from "../api/serverApi";
import { EmptyState } from "../components/EmptyState";

const ProfilePage = () => {
  const { user, logout } = useAuth();

  const { data: orders, isLoading } = useGetAllOrdersQuery(user?._id);
  const navigate = useNavigate();

  if (!user) return null;

  if (isLoading) {
    return (
      <EmptyState
        title="Loading Profile"
        message="Please wait while we fetch your profile details."
        imageSrc="/loading.jpg"
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-secondary">My Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="col-span-1 rounded-2xl p-6 bg-primary shadow-md border border-highlight backdrop-blur-md flex flex-col items-center text-center">
          <img
            src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`}
            alt="avatar"
            className="w-28 h-28 rounded-full mb-4 shadow border-2 border-accent"
          />
          <h3 className="font-semibold text-lg">{user.name}</h3>
          <p className="text-sm text-muted break-words">{user.email}</p>
        </div>

        {/* Account Controls */}
        <div className="col-span-2 rounded-2xl p-5 bg-primary shadow-md border border-highlight backdrop-blur-md flex flex-col gap-6">
          {/* Quick Actions */}
          <div>
            <h4 className="font-semibold text-md mb-2">Quick Actions</h4>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/orders"
                className="w-full sm:w-auto px-5 py-3 bg-accent text-primary rounded-full font-medium text-center hover:scale-105 transition"
              >
                View My Orders
              </Link>

              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="w-full sm:w-auto px-5 py-3 bg-red-500 text-white rounded-full font-medium hover:scale-105 transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-primary bg-opacity-5 rounded-xl p-4 border border-highlight">
            <h4 className="font-semibold text-md mb-2">Account Info</h4>
            <ul className="text-sm text-muted space-y-1">
              <li>Joined: {new Date(user.createdAt).toLocaleDateString()}</li>
              <li>User ID: {user._id}</li>
              {/* Add more fields if available */}
            </ul>
          </div>
        </div>
      </div>

      {/* Orders Summary */}
      <div className="mt-6">
        <OrderSummaryCard orders={orders} />
      </div>
    </div>
  );
};

export default ProfilePage;
