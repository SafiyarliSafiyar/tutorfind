import { useMemo, useState } from "react";
import TutorCard from "../components/TutorCard";

const MOCK_TUTORS = [
  {
    id: "1",
    name: "Aysel M.",
    subjects: ["Math", "Physics"],
    city: "Baku",
    district: "Yasamal",
    rating: 4.8,
    reviews: 12,
    price: 20,
    availabilityDays: ["Monday", "Wednesday"]
  },
  {
    id: "2",
    name: "Kamran R.",
    subjects: ["English", "IELTS"],
    city: "Baku",
    district: "Nasimi",
    rating: 4.6,
    reviews: 9,
    price: 18,
    availabilityDays: ["Tuesday", "Thursday"]
  },
  {
    id: "3",
    name: "Leyla A.",
    subjects: ["Chemistry", "Biology"],
    city: "Baku",
    district: "Sabail",
    rating: 4.9,
    reviews: 21,
    price: 25,
    availabilityDays: ["Monday", "Friday"]
  },
  {
    id: "4",
    name: "Rauf S.",
    subjects: ["Math", "Programming"],
    city: "Baku",
    district: "Nasimi",
    rating: 4.5,
    reviews: 7,
    price: 15,
    availabilityDays: ["Wednesday", "Saturday"]
  },
  {
    id: "5",
    name: "Nigar H.",
    subjects: ["Piano", "Music Theory"],
    city: "Baku",
    district: "Yasamal",
    rating: 4.7,
    reviews: 14,
    price: 22,
    availabilityDays: ["Tuesday", "Thursday"]
  },
  {
    id: "6",
    name: "Elvin K.",
    subjects: ["Physics", "SAT Prep"],
    city: "Baku",
    district: "Sabail",
    rating: 4.3,
    reviews: 5,
    price: 17,
    availabilityDays: ["Sunday"]
  }
];

const SearchResults = () => {
  const [filters, setFilters] = useState({
    city: "",
    district: "",
    subject: "",
    minPrice: "",
    maxPrice: "",
    minRating: "",
    availabilityDays: [],
    sortBy: "rating"
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const toggleDay = (day) => {
    setFilters((prev) => {
      const hasDay = prev.availabilityDays.includes(day);
      return {
        ...prev,
        availabilityDays: hasDay
          ? prev.availabilityDays.filter((d) => d !== day)
          : [...prev.availabilityDays, day]
      };
    });
  };

  const filteredTutors = useMemo(() => {
    const {
      city,
      district,
      subject,
      minPrice,
      maxPrice,
      minRating,
      availabilityDays
    } = filters;
    return MOCK_TUTORS.filter((tutor) => {
      if (city) {
        const term = city.toLowerCase();
        if (!tutor.city.toLowerCase().includes(term)) return false;
      }

      if (district) {
        const term = district.toLowerCase();
        if (!tutor.district.toLowerCase().includes(term)) return false;
      }

      if (subject) {
        const term = subject.toLowerCase();
        const matchesSubject = tutor.subjects.some((s) =>
          s.toLowerCase().includes(term)
        );
        if (!matchesSubject) return false;
      }

      if (minPrice && tutor.price < Number(minPrice)) return false;
      if (maxPrice && tutor.price > Number(maxPrice)) return false;
      if (minRating && tutor.rating < Number(minRating)) return false;
      if (availabilityDays.length) {
        const hasDay = tutor.availabilityDays?.some((day) =>
          availabilityDays.includes(day)
        );
        if (!hasDay) return false;
      }
      return true;
    });
  }, [filters]);

  const sortedTutors = useMemo(() => {
    const list = [...filteredTutors];
    switch (filters.sortBy) {
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      default:
        return list;
    }
  }, [filteredTutors, filters.sortBy]);

  return (
    <div className="search-layout">
      <aside className="filters-panel" aria-label="Filters">
        <div className="filters-panel__inner">
          <header className="filters-header">
            <p className="eyebrow">Refine</p>
            <h3>Filters</h3>
          </header>

          <div className="filter-group">
            <label className="field">
              <span>City</span>
              <input
                name="city"
                placeholder="e.g., Baku"
                value={filters.city}
                onChange={handleChange}
              />
            </label>
            <label className="field">
              <span>District</span>
              <input
                name="district"
                placeholder="e.g., Yasamal"
                value={filters.district}
                onChange={handleChange}
              />
            </label>
            <label className="field">
              <span>Subject</span>
              <input
                name="subject"
                placeholder="e.g., Math"
                value={filters.subject}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="filter-group">
            <div className="price-row">
              <label className="field">
                <span>Min Price</span>
                <input
                  name="minPrice"
                  type="number"
                  min={0}
                  value={filters.minPrice}
                  onChange={handleChange}
                  placeholder="0"
                />
              </label>
              <label className="field">
                <span>Max Price</span>
                <input
                  name="maxPrice"
                  type="number"
                  min={0}
                  value={filters.maxPrice}
                  onChange={handleChange}
                  placeholder="50"
                />
              </label>
            </div>
            <label className="field">
              <span>Min Rating</span>
              <input
                name="minRating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                placeholder="e.g., 4"
                value={filters.minRating}
                onChange={handleChange}
              />
            </label>
            <div className="field">
              <span>Available weekdays</span>
              <div className="weekday-grid">
                {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((day) => (
                  <label key={day} className="checkbox">
                    <input
                      type="checkbox"
                      checked={filters.availabilityDays.includes(day)}
                      onChange={() => toggleDay(day)}
                    />
                    <span>{day}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      <section className="results-panel">
        <header className="results-header">
          <div>
            <p className="eyebrow">Search results</p>
            <h2>{sortedTutors.length} Tutors found</h2>
          </div>
          <label className="field field--inline">
            <span>Sort by</span>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleChange}
            >
              <option value="rating">Rating</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </label>
        </header>

        <div className="results-grid">
          {sortedTutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default SearchResults;
