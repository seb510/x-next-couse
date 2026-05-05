import type {Metadata} from "next";
import ExploreBlock from './ExploreBlock';
import {Suspense} from "react";

export const metadata: Metadata = {
    title: "Explore",
};

export default function ExplorePage() {
   return <Suspense>
       <ExploreBlock />
   </Suspense>;
}
