import { useState } from "react";
import AddMemberModal from "../components/AddMemberModal";
import EditMemberModal from "../components/EditMemberModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import TeamMemberCard from "../components/TeamMemberCard";

type TeamRole = "Admin" | "Member";

type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: TeamRole;
};

const initialTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sherifzade Bajrami",
    email: "sherifzade@example.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Member",
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma@example.com",
    role: "Member",
  },
];

function TeamPage() {
  const [teamMembers, setTeamMembers] =
    useState<TeamMember[]>(initialTeamMembers);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const handleUpdateMember = (updatedMember: TeamMember) => {
    setTeamMembers((currentMembers) =>
      currentMembers.map((member) =>
        member.id === updatedMember.id ? updatedMember : member,
      ),
    );

    setSelectedMember(null);
  };

  const handleDeleteMember = (id: number) => {
    setTeamMembers((currentMembers) =>
      currentMembers.filter((member) => member.id !== id),
    );
  };
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);

  const handleAddMember = (name: string, email: string, role: TeamRole) => {
    const newMember: TeamMember = {
      id: Date.now(),
      name,
      email,
      role,
    };

    setTeamMembers((currentMembers) => [...currentMembers, newMember]);

    setIsAddMemberOpen(false);
  };
  return (
    <main>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-violet-600">Team</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-950">
            Manage team
          </h1>

          <p className="mt-2 text-zinc-500">
            Add and manage people across your workspace.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddMemberOpen(true)}
          className="w-full rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700 sm:w-auto"
        >
          Add Member
        </button>
      </div>

      <section className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {" "}
        {teamMembers.map((member) => (
          <TeamMemberCard
            key={member.id}
            name={member.name}
            email={member.email}
            role={member.role}
            onEdit={() => setSelectedMember(member)}
            onDelete={() => setMemberToDelete(member)}
          />
        ))}
      </section>
      <AddMemberModal
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        onAdd={handleAddMember}
      />
      {selectedMember && (
        <EditMemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          onSave={handleUpdateMember}
        />
      )}
      {memberToDelete && (
        <ConfirmDeleteModal
          isOpen={true}
          title="Remove member?"
          description={`Are you sure you want to remove "${memberToDelete.name}" from the team?`}
          onCancel={() => setMemberToDelete(null)}
          onConfirm={() => {
            handleDeleteMember(memberToDelete.id);
            setMemberToDelete(null);
          }}
        />
      )}
    </main>
  );
}

export default TeamPage;
