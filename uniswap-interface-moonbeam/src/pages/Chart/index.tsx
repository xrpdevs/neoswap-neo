import React, { useContext, useMemo, useState } from 'react'
import { ThemeContext } from 'styled-components'
/*import { Pair } from 'neoswap-sdk'*/
import { Link } from 'react-router-dom'
//import { SwapPoolTabs } from '../../components/NavigationTabs'
//import { useTranslation } from 'react-i18next'
import { ethers } from 'ethers'
import Question from '../../components/QuestionHelper'
/*import FullPositionCard from '../../components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { StyledInternalLink, TYPE } from '../../theme'*/
import { Text } from 'rebass'
/*import { LightCard } from '../../components/Card'*/
import { RowBetween } from '../../components/Row'
import { ButtonPrimary } from '../../components/Button'
import { AutoColumn } from '../../components/Column'

/*import { useActiveWeb3React } from '../../hooks'
import { usePairs } from '../../data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'*/
import AppBody from '../AppBody'
//import { Dots } from '../../components/swap/styleds'
import { Line } from 'react-chartjs-2'
//import { options } from '../../components/Chart/chartOptions'
import { useLocation } from 'react-router-dom'
//import { useSingleCallResult } from '../../state/multicall/hooks'
import { factory } from '../../moonbase_address.json'

//import { NavLink } from 'react-router-dom'

import { abi } from '../../constants/abis/factory.json'
//import get from 'lodash/get'

import {
  Chart as ChartJS,
  TimeScale, //Import timescale instead of category for X axis
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  _adapters
} from 'chart.js'

import 'chartjs-adapter-date-fns'
import { useSingleCallResult } from '../../state/multicall/hooks'
//import {useSingleCallResult} from "../../state/multicall/hooks";
//import { useSelector } from 'react-redux'
///import { useSingleCallResult } from '../../state/multicall/hooks'
//import {useSingleCallResult} from "../../state/multicall/hooks";

//import { enUS } from 'date-fns/locale'

ChartJS.register(
  TimeScale, //Register timescale instead of category for X axis
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
//var timeFormat = 'DD/MM/YYYY';
const data: any = {
  datasets: null
}

//const timeFormat = 'YYYY-MM-DD';

/*function convertEpoch(val: any){
  let nd = new Date(val)
  console.log(nd)
  return nd
}*/

const options: any = {
  responsive: true,
  title: {
    display: true,
    text: 'Chart.js Time Scale'
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'minute',

        displayFormats: {
          second: 'HH:mm',
          minute: 'HH:mm',
          hour: 'HH:mm',
          day: 'd.MM.',
          week: 'd.MM.'
        }
      }
    }
  }
}

export function useGetPairAddr(addr1: string | undefined, addr2: string | undefined): string | undefined {
  const ctr = new ethers.Contract(factory, abi)
  const resultStr: string | undefined = useSingleCallResult(ctr, 'getPair', [addr1, addr2])?.result?.[0]?.toString()
  return useMemo(() => (typeof resultStr === 'string' ? resultStr : ''), [resultStr])
}

export default function PoolChart() {
  const theme = useContext(ThemeContext)

  //const location = useLocation()

  const locationState: any = useLocation().state
  const fukdata: string[] = locationState.fuckoff
  //as Record<string, any>

  console.log('Passed state: ', locationState, fukdata)

  const [loading, updateLoading] = useState(0)
  ////////////// const [loading2, udl2] = useState(0)

  // const mother = useSingleCallResult(ctr, 'getPair', [fukdata[0], fukdata[1]])

  /////////////////console.log("fuka", mother)

  const spa = useGetPairAddr(fukdata[0], fukdata[1])

  const loadChart = async (pair: string | undefined, duration: number) => {
    if (typeof pair !== undefined && typeof pair === 'string' && pair !== '' && loading === 0) {
      const string = 'https://api.viri.uk/dexchart?paddr=' + pair + '&duration=' + duration
      fetch(string)
        .then(res => res.json())
        .then(body => {
          console.log(body)
          data.datasets = body
          data.datasets[0].fill = false
          data.datasets[0].borderColor = 'red'
          data.datasets[0].xAxisID = 'x'
          data.datasets[1].fill = true
          data.datasets[1].borderColor = 'blue'
          data.datasets[1].xAxisID = 'x'
          updateLoading(1)
        })
        .catch(err => {
          console.log('Error:', err)
        })
    }
  }

  //if(mother && mother.result && mother.result.length > 0) {
  loadChart(spa, 233)
  //  }

  return (
    <>
      <AppBody>
        <AutoColumn gap="lg" justify="center">
          <Text fontWeight={500} fontSize={20}>
            {'Chart'}
          </Text>

          <AutoColumn gap="12px" style={{ width: '100%' }}>
            <RowBetween padding={'0 8px'}>
              <Text color={theme.text1} fontWeight={500}>
                {'Value of SFT in WSGB, 24h'}
              </Text>
              <Question text="When you add liquidity, you are given pool tokens that represent your share. If you don’t see a pool you joined in this list, try importing a pool below." />
            </RowBetween>
            <div>
              {/* { mother && mother.hasOwnProperty("result") ? <>*/}
              {loading === 0 ? 'Loading, Please Wait' : <Line options={options} data={data} />}
              {/* </>
                : 'Getting Pool Addr.. '
              }*/}
            </div>
          </AutoColumn>
          <ButtonPrimary id="join-pool-button" as={Link} style={{ padding: 16 }} to="/">
            <Text fontWeight={500} fontSize={20}>
              {'Back to Swap Page'}
            </Text>
          </ButtonPrimary>
        </AutoColumn>
      </AppBody>
    </>
  )
}
