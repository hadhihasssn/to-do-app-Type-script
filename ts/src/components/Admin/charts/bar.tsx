// import ResizableBox from "./helper";
// import useDemoConfig from "./demoData";
// import React from "react";
// import { AxisOptions, Chart } from "react-charts";

// export default function MultipleAxes() {
//     const { data, randomizeData } = useDemoConfig({
//         series: 6,
//         dataType: "time",
//     });

//     // @ts-ignore
//     data.forEach((d, i) => (d.secondaryAxisId = i > 2 ? "2" : undefined));

//     const primaryAxis = React.useMemo<
//         AxisOptions<typeof data[number]["data"][number]>
//     >(
//         () => ({
//             getValue: (datum) => datum.primary as unknown as Date,
//             // Pad the automatically detected time scale with half of the band-size
//             padBandRange: true,
//         }),
//         []
//     );

//     const secondaryAxes = React.useMemo<
//         AxisOptions<typeof data[number]["data"][number]>[]
//     >(
//         () => [
//             {
//                 getValue: (datum) => datum.secondary,
//                 elementType: "bar",
//                 // stacked: true,
//             },
//             {
//                 id: "2",
//                 getValue: (datum) => datum.secondary,
//                 elementType: "line",
//             },
//         ],
//         []
//     );

//     return (
//         <>
//             <button className='ml-8  font-sans font-bold text-xl' onClick={randomizeData}>Most Freelancer Job</button>
//             <br />
//             <br />
//             <ResizableBox>
//                 <Chart
//                     options={{
//                         data,
//                         primaryAxis,
//                         secondaryAxes,
//                     }}
//                 />
//             </ResizableBox>
//         </>
//     );
// }
