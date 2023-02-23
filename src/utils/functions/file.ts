import { BaseDirectory, createDir, exists, writeTextFile, readTextFile, readDir } from '@tauri-apps/api/fs';

interface IFile {
  dockaNumber: number;
  selectedCar: string;
  lecturerValue: string;
  loadingMethodValue: string;
  roteValue: string;
  startHour: Date;
  endHour: Date;
}

interface IFileFormated {
  dockaNumber: number;
  selectedCar: string;
  lecturerValue: string;
  loadingMethodValue: string;
  roteValue: string;
  startHour: string;
  endHour: string;
  time: string;
}

const dataFormater = (data: IFile) => {
  const dataFomated: IFileFormated = {
    dockaNumber: data.dockaNumber,
    selectedCar: data.selectedCar,
    lecturerValue: data.lecturerValue,
    loadingMethodValue: data.loadingMethodValue,
    roteValue: data.roteValue,
    startHour: '',
    endHour: '',
    time: '',
  }

  dataFomated.startHour = `${data.startHour.getDate()}-${data.startHour.getMonth() + 1}-${data.startHour.getFullYear()} ${data.startHour.getHours()}:${data.startHour.getMinutes()}:${data.startHour.getSeconds()}`;
  dataFomated.endHour = `${data.endHour.getDate()}-${data.endHour.getMonth() + 1}-${data.endHour.getFullYear()} ${data.endHour.getHours()}:${data.endHour.getMinutes()}:${data.endHour.getSeconds()}`;

  const timeInTimestamp = data.endHour.getTime() - data.startHour.getTime();

  dataFomated.time = String(Math.floor(timeInTimestamp / (1000 * 60)));

  return dataFomated;
}

export const fileWriter = async (dataToFormat: IFile) => {
  const date = new Date();
  const today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

  const data = dataFormater(dataToFormat);

  const dataInCsv = `${data.dockaNumber};${data.selectedCar};${data.lecturerValue};${data.loadingMethodValue};${data.roteValue};${data.startHour};${data.endHour};${data.time};\n`;

  const folderExists = await exists('OperationHistory',  { dir: BaseDirectory.Document });

  if (!folderExists) {
    await createDir('OperationHistory', { dir: BaseDirectory.Document, recursive: true });
  }

  const fileExists = await exists(`OperationHistory\\${today}.txt`,  { dir: BaseDirectory.Document });

  if (!fileExists) {
    await writeTextFile(`OperationHistory\\${today}.txt`, dataInCsv, { dir: BaseDirectory.Document });
  }

  if (fileExists) {
    const contents = await readTextFile(`OperationHistory\\${today}.txt`, { dir: BaseDirectory.Document });

    await writeTextFile(`OperationHistory\\${today}.txt`, `${contents}${dataInCsv}`, { dir: BaseDirectory.Document });
  }
}
