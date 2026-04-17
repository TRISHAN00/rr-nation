import MemberDetailView from "@/app/(frontend)/profile/_components/MemberDetailView";

export default function MemberTab({ memberInfo }) {
    return <MemberDetailView member={memberInfo} />;
}