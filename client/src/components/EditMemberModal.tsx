import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";

type TeamRole = "Admin" | "Member";

type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: TeamRole;
};

type EditMemberModalProps = {
  member: TeamMember;
  onClose: () => void;
  onSave: (member: TeamMember) => void;
};

function EditMemberModal({
  member,
  onClose,
  onSave,
}: EditMemberModalProps) {
  const [name, setName] = useState(member.name);
  const [email, setEmail] = useState(member.email);
  const [role, setRole] = useState<TeamRole>(member.role);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }

    onSave({
      ...member,
      name: name.trim(),
      email: email.trim(),
      role,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-member-title"
        className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl"
      >
        <div className="mb-6">
          <h2
            id="edit-member-title"
            className="text-xl font-semibold text-zinc-950"
          >
            Edit Member
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Update this team member&apos;s information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="edit-member-name"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              Name
            </label>

            <input
              id="edit-member-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
          </div>

          <div>
            <label
              htmlFor="edit-member-email"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              Email
            </label>

            <input
              id="edit-member-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
          </div>

          <div>
            <label
              htmlFor="edit-member-role"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              Role
            </label>

            <div className="relative">
              <select
                id="edit-member-role"
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
              onClick={onClose}
              className="rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMemberModal;