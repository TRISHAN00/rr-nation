"use client"
import Title from "@/app/components/common/Title";
import { getAllMembers } from "@/services/member.service";
import { useCallback, useEffect, useRef, useState } from "react";
import TeamFilter from "./TeamFilter";

const LIMIT = 8;

export default function Team({ membersTitle }) {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [activeType, setActiveType] = useState("all");
  const observerRef = useRef(null);

  const overLine = membersTitle?.section_data?.overline_text;
  const subtitle = membersTitle?.section_data?.subtitle;

  const fetchMembers = useCallback(
    async (pageNumber, reset = false) => {
      const memberType = activeType === "all" ? "" : activeType;
      try {
        const res = await getAllMembers(pageNumber, LIMIT, memberType);
        const items = res?.data?.items || [];
        setMembers((prev) => (reset ? items : [...prev, ...items]));
        setHasMore(items.length === LIMIT);
      } catch (error) {
        console.log(error);
      }
    },
    [activeType]
  );

  useEffect(() => {
    setPage(1);
    setLoading(true);
    fetchMembers(1, true).finally(() => setLoading(false));
  }, [fetchMembers]);

  // Load next page when the page increments
  useEffect(() => {
    if (page === 1) return;
    fetchMembers(page);
  }, [page, fetchMembers]);

  // Load next index split when the sentinel scrolls into view
  const lastElementRef = (node) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    if (node) observerRef.current.observe(node);
  };

  return (
    <section>
      <div className="container mx-auto px-4 sm:px-6 lg:px-7.5 py-14 sm:py-20 lg:py-30">
        <Title
          label={overLine}
          title={subtitle}
          hideBtnArrow
          hideSearch
          searchPlaceholder="Search team..."
        />
        {/* Filter + grid, all driven by the API, infinite scroll */}
        <TeamFilter
          members={members}
          loading={loading}
          hasMore={hasMore}
          active={activeType}
          onFilterChange={setActiveType}
          lastElementRef={lastElementRef}
        />
      </div>
    </section>
  );
}