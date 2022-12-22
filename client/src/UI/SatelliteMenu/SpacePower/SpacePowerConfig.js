/* eslint-disable react/prop-types */
import { Flex } from '@chakra-ui/layout';
import { Button, Spinner, useToast } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { FaCog } from 'react-icons/fa';
import { spawn, Thread, Worker } from 'threads';
import shallow from 'zustand/shallow';
import { useUIStore } from '../../../Model/store';
import CustomNumberInput from '../../Elements/CustomNumberInput';
import SPButton from '../../Elements/SPButton';
import SpacePowerModal from './SpacePowerModal';

function SpacePowerConfig({ index }) {
  const {
    isOpen, openMenu, constellationIndex, setOptimizing, isOptimizing,
  } = useUIStore((state) => ({
    openMenu: state.openMenu,
    isOpen: state.isOpen.spacePowerConfig,
    closeMenu: state.closeMenu,
    constellationIndex: state.constellationIndex,
    setOptimizing: state.setOptimizing,
    isOptimizing: state.isOptimizing,
  }), shallow);

  const toastIdRef = useRef();

  const toast = useToast({
    title: 'Optimization in progress...',
    variant: 'subtle',
    position: 'bottom-right',
    containerStyle: {
      maxWidth: '100%',
    },
    padding: '3rem',
    isClosable: false,
    duration: null,
  });

  function addToast() {
    toastIdRef.current = toast();
  }

  useEffect(() => {
    if (isOptimizing && !isOpen) {
      addToast();
    } else if (isOpen) {
      toast.closeAll();
    }
  }, [isOpen, isOptimizing]);

  const onConfig = () => {
    openMenu('spacePowerConfig');
  };
  const { setValue, getValues } = useFormContext();
  const onChangeNumber = (v) => {
    const prev = getValues(`constellations.${index}.spacePowerIndices`);
    setValue(`constellations.${index}.spacePowerIndices`, Array.from({ length: v }, (a, i) => prev[i] || 0));
  };

  const onOptimize = async () => {
    setOptimizing(true);
    const worker = await spawn(new Worker(new URL('../../../Model/workers/optimizeWorker.js', import.meta.url)));
    worker.optimize({ constellations: [getValues(`constellations.${constellationIndex}`)] }).subscribe(async (update) => {
      toast.update(toastIdRef.current, {
        description: (
          <>
            <p>
              Generations:
              {' '}
              {update.value.generations}
            </p>
            <p>
              Fitness:
              {' '}
              {update.value.best[0].fitness.toFixed(2)}
            </p>
          </>),
      });
      console.log(toast);

      if (!update.done) return;
      Object.entries(update.value.offsets).forEach(([key, value]) => {
        setValue(`constellations.${constellationIndex}.offsets.${key}`, value);
      });
      setValue(`constellations.${constellationIndex}.spacePowerIndices`, update.value.indices);
      setOptimizing(false);
      toast.update(toastIdRef.current, {
        title: 'Optimization complete.', description: `Fitness: ${update.value.best[0].fitness.toFixed(2)}`, isClosable: true, duration: 9000,
      });
      await Thread.terminate(worker);
    });
  };

  useWatch(`constellations.${index}`);
  return (
    <>
      <Flex
        direction="column"
        align="center"
        mb={5}
        gap={5}
      >
        <CustomNumberInput
          name={`constellations.${index}.spacePowersCount`}
          label="Number of power satellites"
          min={0}
          max={10}
          sideEffect={onChangeNumber}
        />
        <SPButton onClick={onOptimize} type="button" width="25ch" disabled={isOptimizing} pointerEvents={isOptimizing && 'none'}>
          {isOptimizing
            ? (
              <Flex justify="center" align="center" gap={5}>
                Optimizing
                <Spinner />
              </Flex>
            )
            : 'Optimize'}
        </SPButton>
        <Button m={3} leftIcon={<FaCog />} onClick={onConfig}>
          Advanced
        </Button>
      </Flex>
      <SpacePowerModal onOptimize={onOptimize} onChangeNumber={onChangeNumber} />
    </>
  );
}

export default SpacePowerConfig;
