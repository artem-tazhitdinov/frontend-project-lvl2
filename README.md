### Tests and linter status:
[![project-check](https://github.com/artem-tazhitdinov/frontend-project-lvl2/actions/workflows/project-check.yml/badge.svg?branch=main)](https://github.com/artem-tazhitdinov/frontend-project-lvl2/actions/workflows/project-check.yml)
### CodeClimat
[![Maintainability](https://api.codeclimate.com/v1/badges/4022e7c8f6530c8c1dd4/maintainability)](https://codeclimate.com/github/artem-tazhitdinov/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4022e7c8f6530c8c1dd4/test_coverage)](https://codeclimate.com/github/artem-tazhitdinov/frontend-project-lvl2/test_coverage)
# Вычислитель отличий
Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменении в конфигурационных файлах.

Возможности утилиты:
- Поддержка разных входных форматов: yaml, json
- Генерация отчета в виде plain text, stylish и json

## Демо
### Stylish output (JSON and YML)
[![asciicast](https://asciinema.org/a/DIqvcYoawYYSVGyoJRaQacLCz.svg)](https://asciinema.org/a/DIqvcYoawYYSVGyoJRaQacLCz)
### Plain output
[![asciicast](https://asciinema.org/a/H4MkBPtymNvlUub63DJ5Wkd0A.svg)](https://asciinema.org/a/H4MkBPtymNvlUub63DJ5Wkd0A)
### JSON output
[![asciicast](https://asciinema.org/a/zR72YWLwdPW1Q1HxjCtDYcjQI.svg)](https://asciinema.org/a/zR72YWLwdPW1Q1HxjCtDYcjQI)

## Установка
После клонирования проекта выполнить в терминале из директории проекта следующие комманды:
```
make install
```
```
sudo npm link
```
Сравнение файлов выполняется командой: 
```
gendiff <file1> <file2> --format <format>
```