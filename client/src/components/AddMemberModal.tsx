import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";

type TeamRole = "Admin" | "Member";

type AddMemberModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (
    name: string,
    email: string,
    role: TeamRole,
  ) => void;
};

function AddMemberModal({
  isOpen,
  onClose,
  onAdd,
}: AddMemberModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<TeamRole>("Member");
  const [error, setError] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setRole("Member");
    setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }

    onAdd(
      name.trim(),
      email.trim(),
      role,
    );

    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-member-title"
        className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl"
      >
        <div className="mb-6">
          <h2
            id="add-member-title"
            className="text-xl font-semibold text-zinc-950"
          >
            Add Member
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Add a new member to your team.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="member-name"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              Name
            </label>

            <input
              id="member-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Full name"
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
          </div>

          <div>
            <label
              htmlFor="member-email"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              Email
            </label>

            <input
              id="member-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email@example.com"
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
          </div>

          <div>
            <label
              htmlFor="member-role"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              Role
            </label>

            <div className="relative">
              <select
                id="member-role"
                value={role}
                onChange={(event) =>
                  setRole(event.target.value as TeamRole)
                }
                className="w-full appearance-none rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-3 pr-10 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
              >
                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMemberModal;