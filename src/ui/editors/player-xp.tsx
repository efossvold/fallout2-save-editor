import React from 'react'
import { Box, Text } from 'react-native-magnus'
import { getLevelXP } from '../../api/data/xp-levels'
import { HStack, VStack } from '../components/flex'
import { MAX_LEVEL, MIN_LEVEL } from '../constants'
import { NameChanger } from '../name-changer'
import { PanelHeader } from '../panel'
import * as S from '../selectors'
import { useAPIStore } from '../store'
import { colors, LINE_HEIGHT } from '../theme'
import { ValueSetter } from '../value-setter'

export const PlayerXP = () => {
  const data = useAPIStore(s => s.data)
  const setData = useAPIStore(s => s.setData)
  const playerAge = useAPIStore(S.getPlayerAge)

  return (
    <Box>
      <PanelHeader text="PLAYER INFO" />
      <VStack space={LINE_HEIGHT}>
        <HStack justifyContent="space-between">
          <Text color={colors.green200}>Name</Text>
          <NameChanger name={data.characterName} />
        </HStack>

        <ValueSetter
          name="Age"
          baseValue={data.baseAge}
          bonusValue={data.bonusAge}
          helperText="How old you are. Sometimes we forget... :)"
          valueText={`${playerAge}`}
          isMinValue={playerAge <= 18}
          minValueMsg="Come on, let's respect the PG shall we?"
          onIncrease={() => {
            setData('baseAge', data.baseAge + 1)
          }}
          onDecrease={() => {
            setData('baseAge', data.baseAge - 1)
          }}
          dimOnZero={false}
        />

        <ValueSetter
          name="Gender"
          baseValue={data.baseGender}
          valueText={data.baseGender === 0 ? 'Male' : 'Female'}
          helperText="Yup. Haven't changed."
          onIncrease={() => {
            setData('baseGender', 1)
          }}
          onDecrease={() => {
            setData('baseGender', 0)
          }}
          minBaseValue={0}
          dimOnZero={false}
        />

        <ValueSetter
          name="Level"
          baseValue={data.playerLevel}
          helperText="Keep up the good work."
          minBaseValue={MIN_LEVEL}
          maxBaseValue={MAX_LEVEL}
          minValueMsg="Oh, back to where we started..."
          maxValueMsg="Now don't get gready..."
          onIncrease={() => {
            const nextLevel = data.playerLevel + 1
            setData('playerLevel', data.playerLevel + 1)
            if (nextLevel < 99) {
              setData('playerXP', +getLevelXP(data.playerLevel - 1))
            }
          }}
          onDecrease={() => {
            const nextLevel = data.playerLevel - 1
            setData('playerLevel', data.playerLevel - 1)
            if (nextLevel < 99) {
              setData('playerXP', +getLevelXP(data.playerLevel - 1))
            }
          }}
          dimOnZero={false}
        />

        <ValueSetter
          name="XP"
          baseValue={data.playerXP}
          helperText="Keep 'em coming."
          minValueMsg="Already as noob as one can get. It's a hard world out there, best of luck"
          maxValueMsg="Now don't get greedy..."
          onIncrease={() => {
            const xp = Math.trunc(data.playerXP * 1.1)
            setData('playerXP', xp)
          }}
          onDecrease={() => {
            setData('playerXP', data.playerXP * 0.9)
          }}
          dimOnZero={false}
        />

        <HStack justifyContent="space-between">
          <Text color={colors.green200}>Next Level:</Text>
          <Text color={colors.green200} mr={11}>
            {getLevelXP(data.playerLevel + 1)}
          </Text>
        </HStack>
      </VStack>
    </Box>
  )
}
