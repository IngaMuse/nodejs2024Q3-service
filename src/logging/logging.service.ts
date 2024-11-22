import { Injectable, LoggerService } from '@nestjs/common';
import { LogLevels } from 'src/types/logging.enum';
import { stat, writeFile, mkdir, appendFile } from 'node:fs/promises';
import * as os from 'node:os';

const { EOL } = os;
const LOG_LEVEL = Number(process.env.LOG_LEVEL);
const LOG_FILE_SIZE_KB = Number(process.env.LOG_FILE_SIZE_KB);
const KB = 1024;

@Injectable()
export class LoggingService implements LoggerService {
  log(message: any) {
    if (LOG_LEVEL >= LogLevels.LOG) {
      const formattedMessage = `[LOG] ${message}${EOL}`;
      this.writeLoggingMessageToConsole(formattedMessage);
      this.loggingToFile(formattedMessage, 'LOG');
    }
  }

  fatal(message: any) {
    if (LOG_LEVEL >= LogLevels.FATAL) {
      const formattedMessage = `[FATAL] ${message}${EOL}`;
      this.writeLoggingMessageToConsole(formattedMessage);
      this.loggingToFile(formattedMessage, 'LOG');
    }
  }

  error(message: any) {
    if (LOG_LEVEL >= LogLevels.ERROR) {
      const formattedMessage = `[ERROR] ${message}${EOL}`;
      this.writeLoggingMessageToConsole(formattedMessage);
      this.loggingToFile(formattedMessage, 'ERROR');
    }
  }

  warn(message: any) {
    if (LOG_LEVEL >= LogLevels.WARN) {
      const formattedMessage = `[WARN] ${message}${EOL}`;
      this.writeLoggingMessageToConsole(formattedMessage);
      this.loggingToFile(formattedMessage, 'LOG');
    }
  }

  debug(message: any) {
    if (LOG_LEVEL >= LogLevels.DEBUG) {
      const formattedMessage = `[DEBUG] ${message}${EOL}`;
      this.writeLoggingMessageToConsole(formattedMessage);
      this.loggingToFile(formattedMessage, 'LOG');
    }
  }

  verbose(message: any) {
    if (LOG_LEVEL >= LogLevels.VERBOSE) {
      const formattedMessage = `[VERBOSE] ${message}${EOL}`;
      this.writeLoggingMessageToConsole(formattedMessage);
      this.loggingToFile(formattedMessage, 'LOG');
    }
  }

  private writeLoggingMessageToConsole(message: any) {
    const { stdout } = process;
    stdout.write(message);
  }

  private async loggingToFile(message: string, logType: string) {
    let logFilePath: null | string = null;
    if (
      !logFilePath ||
      (await stat(logFilePath)).size > LOG_FILE_SIZE_KB * KB
    ) {
      try {
        await mkdir('logs');
      } catch {}
      logFilePath = `logs/LOG_${Date.now().valueOf()}_${logType}.log`;
      await appendFile(logFilePath, message);
    } else {
      await writeFile(logFilePath, message);
    }
  }
}
