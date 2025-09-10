"use client";
 
import { Typography } from "@material-tailwind/react";
import { Brain, Code, Palette, Smartphone } from "lucide-react";

import { useState } from "react";
import BackgroundGlobe from "./BackgroundGlobe";
import { log } from "three/tsl";
import { skillsData, SkillItem, SkillBucket, DomainGroup } from "../data/content";

type SkillListItemProps = {
  item: SkillItem;
};

function SkillListItem({ item }: SkillListItemProps) {
  return (
    <li aria-label={`${item.name} — ${item.level}%`}>
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        <span className="text-white/90 text-xs sm:text-sm" aria-hidden="true">{item.name}</span>
        {/* <div className="flex items-center gap-2">
          {typeof item.years === 'number' && (
            <span className="text-white/60 text-[11px]">{`Exp. ${item.years} an${item.years > 1 ? 's' : ''}`}</span>
          )}
          <span className="text-white/60 text-xs tabular-nums" aria-hidden="true">{item.level}%</span>
          <span className={`px-2 py-0.5 rounded-full border text-[10px] ${levelInfo.className}`}>{levelInfo.label}</span>
        </div> */}
      </div>
      <div className="mt-2 h-2 sm:h-2.5 bg-black/30 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-700 will-change-[width] bg-gray-800 dark:bg-gradient-to-r dark:from-violet-500 dark:via-fuchsia-500 dark:to-pink-500"
          style={{ width: `${item.level}%` }}
          role="progressbar"
          aria-valuenow={item.level}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {(item.tags?.length || item.summary) && (
        <div className="mt-2 flex flex-wrap gap-1 sm:gap-1.5">
          {item.tags?.map((tag) => (
            <span
              key={`${item.name}-${tag}`}
              className="px-1.5 sm:px-2 py-0.5 rounded-full border border-white/10 bg-black/30 text-white/70 text-[10px] sm:text-[11px]"
              title={tag}
            >
              {tag}
            </span>
          ))}
          {item.summary && (
            <span className="w-full text-white/60 text-[11px] sm:text-[12px] leading-relaxed">
              {item.summary}
            </span>
          )}
        </div>
      )}
    </li>
  );
}

type SkillBucketSectionProps = {
  bucket: SkillBucket;
  ariaScope: string;
};

function SkillBucketSection({ bucket, ariaScope }: SkillBucketSectionProps) {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/80 text-xs sm:text-sm font-semibold">
          {bucket.title}
        </span>
      </div>
      <ul className="flex flex-warp flex-col gap-3 sm:gap-4" aria-label={`${bucket.title} — ${ariaScope}`}>
      {/* <ul className="grid grid-cols-1 sm:grid-cols-2  grid-rows-1 sm:grid-rows-2 gap-4" aria-label={`${bucket.title} — ${ariaScope}`}> */}
        {bucket.items.map((item) => (
            <SkillListItem key={item.name} item={item} />
          ))}
        {/* {[...bucket.items]
          .sort((a, b) => b.level - a.level)
          .map((item) => (
            <SkillListItem key={item.name} item={item} />
          ))} */}
      </ul>
    </div>
  );
}


function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);

  const ActiveIcon = skillsData[activeIndex].icon;

  return (
    <section id="Skills" aria-labelledby="skills-title" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* <BackgroundGlobe /> */}
      <div className="max-w-6xl mx-auto flex flex-col">
        <h2 id="skills-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-white">
          Mes compétences
        </h2>
        {/* Switch/One horizontal en haut */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 select-none">
          {skillsData.map((group, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`px-3 sm:px-4 py-2 flex items-center gap-1 sm:gap-2 rounded-full border-2 transition-all duration-300 text-xs sm:text-sm font-medium w-full sm:w-auto justify-center
                ${activeIndex === index ? 'border-fuchsia-500 bg-fuchsia-500/20 text-fuchsia-300 scale-105 shadow-lg' : 'border-white/20 bg-black/30 text-white/60 hover:border-fuchsia-400 hover:text-fuchsia-300'}`}
              // aria-label={group.category}
            >
              <group.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="truncate">{group.category}</span>
            </button>
          ))}
        </div>
        {/* Slide du groupe actif */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full rounded-xl border border-white/10 bg-black/30 transition-all duration-500 shadow-xl animate-fadein">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-black/30 border border-white/10 flex items-center justify-center">
                  <ActiveIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  {skillsData[activeIndex].category}
                </h3>
              </div>
              <p className="text-white/60 text-sm mb-4 sm:mb-6 leading-relaxed">
                {skillsData[activeIndex].description}
              </p>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col lg:flex-row h-max gap-4">
                  {skillsData[activeIndex].buckets.map((bucket) => (
                    <SkillBucketSection key={bucket.title} bucket={bucket} ariaScope={skillsData[activeIndex].category} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;