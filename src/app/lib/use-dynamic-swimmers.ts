import { useEffect, useState } from 'react';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import type { Swimmer } from 'src/db/schema';
import type { SwimmerDataSet } from '@/components/visualisation/graph';
import { getUserByUrlIdentifierViaApi } from './get-user-by-url-identifier';
import type { SwimmerPossibilities } from './fetch-swimmer-options';
import { fetchPossibleOptions } from './fetch-swimmer-options';
import { fetchSwimmerData } from './fetch-swimmer-data';
import { makeDataset } from './make-dataset';

export interface SwimmerInput {
  preamble: string;
}

export interface DynamicSwimmerData {
  possibleOptions?: SwimmerPossibilities;
  swimmer?: Swimmer;
  preamble: string;
}

export interface DynamicSwimmersList {
  datasets: SwimmerDataSet[];
  comparedSwimmers: DynamicSwimmerData[];
}

export interface ColorCombo {
  dataPoints: string;
  regressionLine: string;
}

export interface SwimmerGraphDetails {
  preamble: string;
  colors: ColorCombo;
}

export function useDynamicSwimmers(
  searchParams: ReadonlyURLSearchParams,
  swimmerGraphDetails: SwimmerGraphDetails[],
): { loading: boolean; dynamicList: DynamicSwimmersList } {
  const [loading, setLoading] = useState<boolean>(false);
  const [dynamicList, setDynamicList] = useState<DynamicSwimmersList>({
    datasets: [],
    comparedSwimmers: [],
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- snake biting own tail with this error
    const asyncHandler = async () => {
      setLoading(true);
      const datasets: SwimmerDataSet[] = [];
      const comparedSwimmers: DynamicSwimmerData[] = [];
      const gg = await Promise.all(
        swimmerGraphDetails.map(
          async ({
            preamble,
            colors,
          }): Promise<DynamicSwimmerData | undefined> => {
            let swimmer: Swimmer | undefined;
            const param = searchParams.get(`${preamble}swimmer`);
            let possibleOptions;

            if (param) {
              swimmer = await getUserByUrlIdentifierViaApi(param);
              if (swimmer) {
                possibleOptions = await fetchPossibleOptions({
                  surname: swimmer.surname,
                  lastname: swimmer.lastname,
                });
              }
            }

            if (
              swimmer &&
              possibleOptions?.[
                `${searchParams.get(`${preamble}technique`)}-${searchParams.get(
                  `${preamble}track`,
                )}` as keyof SwimmerPossibilities
              ]
            ) {
              const swimmerResponse = await fetchSwimmerData(
                {
                  technique:
                    searchParams.get(`${preamble}technique`) || undefined,
                  track: searchParams.get(`${preamble}track`) || undefined,
                },
                swimmer.surname,
                swimmer.lastname,
              );

              datasets.push({
                regressionLine: makeDataset(
                  `${preamble}regressionLine`,
                  colors.regressionLine,
                  swimmerResponse.regressionLine,
                ),
                dataPoints: makeDataset(
                  `${preamble}dataPoints`,
                  colors.dataPoints,
                  swimmerResponse.dataPoints,
                ),
              });
            }

            return { swimmer, possibleOptions, preamble };
          },
        ),
      );

      gg.forEach((el) => {
        if (el !== undefined) {
          comparedSwimmers.push(el);
        }
      });

      setLoading(false);
      setDynamicList({ datasets, comparedSwimmers });
    };

    void asyncHandler();
  }, [searchParams, swimmerGraphDetails]);

  return { dynamicList, loading };
}
