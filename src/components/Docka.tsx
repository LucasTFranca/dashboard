import { Flex, Button, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import {
  Select,
  GroupBase
} from "chakra-react-select";
import { useEffect, useState } from "react";
import { useCountdown } from "../hooks/useCountdown";
import { fileWriter } from "../utils/functions/file";

interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  dockaNumber: number;
}

const carTimeToAlarms = {
  Fiorino: 30,
  Kombi: 40,
  Van: 45,
  HR: 45,
}

const carOptions = [
  { value: "Fiorino", label: "Fiorino" },
  { value: "Kombi", label: "Kombi" },
  { value: "Van", label: "Van" },
  { value: "HR", label: "HR" },
]

const lecturerOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
  { value: "14", label: "14" },
  { value: "15", label: "15" },
]

const methodOptions = [
  { value: "não", label: "Sem ajudante" },
  { value: "sim", label: "Com ajudante" },
]

const ShowCounter = ({ hours, minutes, seconds }) => {
  return (
    <Heading marginBottom={4}>{`${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`}</Heading>
  );
};

const Docka = ({ dockaNumber }: Props) => {
  const [selectedCar, setSelectedCar] = useState<SelectOption | null>();
  const [lecturerValue, setLecturer] = useState<SelectOption | null>();
  const [loadingMethodValue, setLoadingMethod] = useState<SelectOption | null>();
  const [roteValue, setRoteValue] = useState<string>('');

  const [disableButtons, setDisableButtons] = useState<boolean>(false);
  const [containerColor, setContainerColor] = useState<string>('');

  const [startHour, setStartHour] = useState<Date>();

  const [hours, minutes, seconds, startCountdown, stopCountdown, updateCountdown] = useCountdown();

  useEffect(() => {
    (document.body.style as any).zoom = "80%";
  }, [])

  useEffect(() => {
    if (selectedCar) {
      if (minutes >= carTimeToAlarms[selectedCar.value]) {
        setContainerColor('#F56565');
      } else if (minutes >= carTimeToAlarms[selectedCar.value] - 5) {
        setContainerColor('#F6E05E');
      }
    }
  }, [minutes])

  const checkInputs = () => {
    if (!selectedCar || !lecturerValue || !loadingMethodValue || !roteValue) {
      return false;
    }

    return true;
  }

  const startTimer = () => {
    const inputsAreFilled = checkInputs();

    if (!inputsAreFilled) {
      return;
    }

    setDisableButtons(true);
    startCountdown();

    const date = new Date();
    setStartHour(date);
  }

  const clearInputs = () => {
    setSelectedCar(null);
    setLecturer(null);
    setLoadingMethod(null);
    setRoteValue('');
    setContainerColor('');
  }

  const stopTimer = () => {
    stopCountdown();
    updateCountdown(0);

    const dataToSave = {
      dockaNumber,
      selectedCar: selectedCar?.value,
      lecturerValue: lecturerValue?.value,
      loadingMethodValue: loadingMethodValue?.value,
      roteValue,
      startHour,
      endHour: new Date(),
    }

    fileWriter(dataToSave)
    clearInputs();

    setDisableButtons(false);
  }

  return (
    <Flex justify="center" align="center" direction="column" width="24em" margin={4} p={4} borderRadius={8} background={ containerColor ? containerColor : '#F7F8F8'}>
      <Heading marginBottom={4}>Doca {dockaNumber}</Heading>

      <Flex m={4} width="100%" justify="space-between">
        <FormControl width={40}>
          <FormLabel>
            Perfil de Veículo
          </FormLabel>

          <Select<SelectOption, false, GroupBase<SelectOption>>
            name="colors"
            className="chakra-react-select"
            classNamePrefix="chakra-react-select"
            isDisabled={disableButtons}
            options={carOptions}
            onChange={(option) => setSelectedCar(option)}
            value={selectedCar}
            selectedOptionStyle="check"
            chakraStyles={{
              dropdownIndicator: (provided) => ({
                ...provided,
                bg: "transparent",
                px: 2,
                cursor: "inherit"
              }),
              indicatorSeparator: (provided) => ({
                ...provided,
                display: "none"
              })
            }}
          />
        </FormControl>

        <FormControl width={40}>
          <FormLabel>
            Conferente
          </FormLabel>

          <Select<SelectOption, false, GroupBase<SelectOption>>
            name="colors"
            className="chakra-react-select"
            classNamePrefix="chakra-react-select"
            isDisabled={disableButtons}
            options={lecturerOptions}
            onChange={(option) => setLecturer(option)}
            value={lecturerValue}
            selectedOptionStyle="check"
            chakraStyles={{
              dropdownIndicator: (provided) => ({
                ...provided,
                bg: "transparent",
                px: 2,
                cursor: "inherit"
              }),
              indicatorSeparator: (provided) => ({
                ...provided,
                display: "none"
              })
            }}
          />
        </FormControl>
      </Flex>

      <Flex m={4} width="100%" justify="space-between">
        <FormControl width={52}>
          <FormLabel>
            Método de Carregamento
          </FormLabel>

          <Select<SelectOption, false, GroupBase<SelectOption>>
            name="colors"
            className="chakra-react-select"
            classNamePrefix="chakra-react-select"
            isDisabled={disableButtons}
            options={methodOptions}
            onChange={(option) => setLoadingMethod(option)}
            value={loadingMethodValue}
            selectedOptionStyle="check"
            chakraStyles={{
              dropdownIndicator: (provided) => ({
                ...provided,
                bg: "transparent",
                px: 2,
                cursor: "inherit"
              }),
              indicatorSeparator: (provided) => ({
                ...provided,
                display: "none"
              })
            }}
          />
        </FormControl>

        <FormControl width={24}>
          <FormLabel>
            Rota
          </FormLabel>

          <Input
            type="number"
            isDisabled={disableButtons}
            value={roteValue}
            onChange={({ target }) => setRoteValue(target.value)}
            placeholder="000000"
          />
        </FormControl>
      </Flex>

      <ShowCounter
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />

      <Flex justifyContent="space-evenly" width="100%" marginTop={2}>
        <Button
          width={28}
          isDisabled={disableButtons}
          onClick={startTimer}
          colorScheme="blue"
        >
          Começar
        </Button>
        <Button
          width={28}
          isDisabled={!disableButtons}
          onClick={stopTimer}
          colorScheme="red"
        >
          Parar
        </Button>
      </Flex>
    </Flex>
  );
}

export default Docka;
