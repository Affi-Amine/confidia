syntax_dicts = {
                'linebreaks':{
                    "py3": {
                        "\n": {}
                    }
                },
                'continuations':{
                    "py3": {
                        "\\": {}
                    }
                },
                'syms':{
                    "py3": {
                        "'''": {
                            "type": "quote",
                            "allow_multiline": True
                        },
                        "\"\"\"": {
                            "type": "quote",
                            "allow_multiline": True
                        },
                        "'": {
                            "type": "quote",
                            "allow_multiline": False
                        },
                        "\"": {
                            "type": "quote",
                            "allow_multiline": False
                        },
                        "#": {
                            "type": "comment",
                            "close": "linebreak"
                        },
                        "(": {
                            "type": "encloser",
                            "close": ")"
                        },
                        "[": {
                            "type": "encloser",
                            "close": "]"
                        },
                        "{": {
                            "type": "encloser",
                            "close": "}"
                        }
                    }
                },
                'enclosers':{
                    "py3": {
                        "(": {
                            "type": "round",
                            "close": ")",
                            "class": "object",
                            "elem": "set",
                            "open_reg": "[\\(]",
                            "close_reg": "[\\)]"
                        },
                        "[": {
                            "type": "squar",
                            "close": "]",
                            "class": "object",
                            "elem": "list",
                            "open_reg": "[\\[]",
                            "close_reg": "[\\]]"
                        },
                        "{": {
                            "type": "graph",
                            "close": "}",
                            "class": "object",
                            "elem": "dictionary",
                            "open_reg": "[\\{]",
                            "close_reg": "[\\}]"
                        }
                    }
                },
                'quotes':{
                    "py3": {
                        "'": {
                            "type": "simple",
                            "allow_multiline": False
                        },
                        "\"": {
                            "type": "double",
                            "allow_multiline": False
                        },
                        "'''": {
                            "type": "tripleS",
                            "allow_multiline": True
                        },
                        "\"\"\"": {
                            "type": "tripleD",
                            "allow_multiline": True
                        }
                    }
                },
                'comments':{
                    "py3": {
                        "#": {
                            "close": "linebreak"
                        }
                    }
                },
                'firstwords':{
                    "py3+": {
                        "match": {
                            "class": "action",
                            "elem": "pattern",
                            "alone": False,
                            "end": ":"
                        },
                        "case": {
                            "class": "action",
                            "elem": "alternative-pattern",
                            "alone": False,
                            "end": ":"
                        },
                        "case other": {
                            "class": "action",
                            "elem": "alternative",
                            "alone": True,
                            "end": ":"
                        }
                    },
                    "py3": {
                        "import": {
                            "class": "import",
                            "elem": "external",
                            "alone": False,
                            "end": "\n"
                        },
                        "from": {
                            "class": "import",
                            "elem": "sub-external",
                            "alone": False,
                            "end": "\n"
                        },
                        "def": {
                            "class": "assignement",
                            "elem": "function",
                            "alone": False,
                            "end": ":"
                        },
                        "class": {
                            "class": "assignement",
                            "elem": "class",
                            "alone": False,
                            "end": ":"
                        },
                        "async": {
                            "class": "assignement",
                            "elem": "coroutine",
                            "alone": False,
                            "end": "\n"
                        },
                        "async def": {
                            "class": "assignement",
                            "elem": "coroutine-function",
                            "alone": False,
                            "end": ":"
                        },
                        "lambda": {
                            "class": "assignement",
                            "elem": "anonymous-function",
                            "alone": None,
                            "end": ":"
                        },
                        "nonlocal": {
                            "class": "assignement",
                            "elem": "variable-nonlocal",
                            "alone": False,
                            "end": "\n"
                        },
                        "global": {
                            "class": "assignement",
                            "elem": "variable-global",
                            "alone": False,
                            "end": "\n"
                        },
                        "with": {
                            "class": "assignement",
                            "elem": "context",
                            "alone": False,
                            "end": ":"
                        },
                        "if": {
                            "class": "action",
                            "elem": "condition",
                            "alone": False,
                            "end": ":"
                        },
                        "try": {
                            "class": "action",
                            "elem": "test",
                            "alone": True,
                            "end": ":"
                        },
                        "elif": {
                            "class": "action",
                            "elem": "alternative-condition",
                            "alone": False,
                            "end": ":"
                        },
                        "except": {
                            "class": "action",
                            "elem": "alternative-test",
                            "alone": None,
                            "end": ":"
                        },
                        "else": {
                            "class": "action",
                            "elem": "alternative",
                            "alone": True,
                            "end": ":"
                        },
                        "finally": {
                            "class": "action",
                            "elem": "alternative-final",
                            "alone": True,
                            "end": ":"
                        },
                        "for": {
                            "class": "action",
                            "elem": "loop-for",
                            "alone": False,
                            "end": ":"
                        },
                        "while": {
                            "class": "action",
                            "elem": "loop-while",
                            "alone": False,
                            "end": ":"
                        },
                        "return": {
                            "class": "action",
                            "elem": "output",
                            "alone": None,
                            "end": "\n"
                        },
                        "raise": {
                            "class": "action",
                            "elem": "output",
                            "alone": None,
                            "end": "\n"
                        },
                        "assert": {
                            "class": "action",
                            "elem": "output",
                            "alone": False,
                            "end": "\n"
                        },
                        "del": {
                            "class": "action",
                            "elem": "output",
                            "alone": False,
                            "end": "\n"
                        },
                        "pass": {
                            "class": "action",
                            "elem": "execution",
                            "alone": True,
                            "end": "\n"
                        },
                        "continue": {
                            "class": "action",
                            "elem": "execution",
                            "alone": True,
                            "end": "\n"
                        },
                        "break": {
                            "class": "action",
                            "elem": "execution",
                            "alone": True,
                            "end": "\n"
                        },
                        "await": {
                            "class": "action",
                            "elem": "execution",
                            "alone": False,
                            "end": "\n"
                        },
                        "yield": {
                            "class": "action",
                            "elem": "execution",
                            "alone": False,
                            "end": "\n"
                        }
                    }
                },
                'keywords':{
                    "py3": {
                        "False": {
                            "class": "value",
                            "elem": "boolean-n"
                        },
                        "True": {
                            "class": "value",
                            "elem": "boolean-y"
                        },
                        "None": {
                            "class": "value",
                            "elem": "null"
                        },
                        "in": {
                            "class": "comparison",
                            "elem": "object-inclusion",
                            "split": "mid"
                        },
                        "not in": {
                            "class": "comparison",
                            "elem": "object-exclusion",
                            "split": "mid"
                        },
                        "is": {
                            "class": "comparison",
                            "elem": "object-equality",
                            "split": "mid"
                        },
                        "is not": {
                            "class": "comparison",
                            "elem": "object-difference",
                            "split": "mid"
                        },
                        "as": {
                            "class": "assignement",
                            "elem": "name",
                            "split": "mid"
                        },
                        "and": {
                            "class": "action",
                            "elem": "condition-and",
                            "split": "all"
                        },
                        "not": {
                            "class": "action",
                            "elem": "condition-not",
                            "split": "from"
                        },
                        "or": {
                            "class": "action",
                            "elem": "condition-or",
                            "split": "all"
                        }
                    }
                },
                'delimiters':{
                    "py3": {
                        "(": {
                            "class": "expression",
                            "elem": "roundPARENTH_open"
                        },
                        ")": {
                            "class": "expression",
                            "elem": "roundPARENTH_close"
                        },
                        "[": {
                            "class": "expression",
                            "elem": "squarPARENTH_open"
                        },
                        "]": {
                            "class": "expression",
                            "elem": "squarPARENTH_close"
                        },
                        "{": {
                            "class": "expression",
                            "elem": "graphPARENTH_open"
                        },
                        "}": {
                            "class": "expression",
                            "elem": "graphPARENTH_close"
                        },
                        ".": {
                            "class": "expression",
                            "elem": "application"
                        },
                        "@": {
                            "class": "expression",
                            "elem": "decorator"
                        },
                        "%": {
                            "class": "expression",
                            "elem": "magic"
                        },
                        ",": {
                            "class": "separator",
                            "elem": "element",
                            "split": "all"
                        },
                        ":": {
                            "class": "separator",
                            "elem": "assignement",
                            "split": "mid"
                        },
                        ";": {
                            "class": "separator",
                            "elem": "linebreak"
                        },
                        "...": {
                            "class": "slicing",
                            "elem": "elipse"
                        },
                        "=": {
                            "class": "assignement",
                            "elem": "from",
                            "split": "mid"
                        },
                        "->": {
                            "class": "assignement",
                            "elem": "annotation",
                            "split": "mid"
                        },
                        ":=": {
                            "class": "assignement",
                            "elem": "from-expression",
                            "split": "mid"
                        },
                        "+=": {
                            "class": "assignement",
                            "elem": "from-add",
                            "split": "mid"
                        },
                        "-=": {
                            "class": "assignement",
                            "elem": "from-substract",
                            "split": "mid"
                        },
                        "*=": {
                            "class": "assignement",
                            "elem": "from-multiply",
                            "split": "mid"
                        },
                        "/=": {
                            "class": "assignement",
                            "elem": "from-divide",
                            "split": "mid"
                        },
                        "//=": {
                            "class": "assignement",
                            "elem": "from-divide-floor",
                            "split": "mid"
                        },
                        "%=": {
                            "class": "assignement",
                            "elem": "from-divide-remainder",
                            "split": "mid"
                        },
                        "@=": {
                            "class": "assignement",
                            "elem": "from-multiply-matrix",
                            "split": "mid"
                        },
                        "&=": {
                            "class": "assignement",
                            "elem": "from-and",
                            "split": "mid"
                        },
                        "|=": {
                            "class": "assignement",
                            "elem": "from-or",
                            "split": "mid"
                        },
                        "^=": {
                            "class": "assignement",
                            "elem": "from-xor",
                            "split": "mid"
                        },
                        ">>=": {
                            "class": "assignement",
                            "elem": "from-shift-right",
                            "split": "mid"
                        },
                        "<<=": {
                            "class": "assignement",
                            "elem": "from-shift-left",
                            "split": "mid"
                        },
                        "**=": {
                            "class": "assignement",
                            "elem": "from-exponential",
                            "split": "mid"
                        }
                    }
                },
                'operators':{
                    "py3": {
                        "+": {
                            "class": "operation",
                            "elem": "add",
                            "split": "all"
                        },
                        "-": {
                            "class": "operation",
                            "elem": "substract",
                            "split": "all"
                        },
                        "*": {
                            "class": "operation",
                            "elem": "multiply",
                            "split": "all"
                        },
                        "**": {
                            "class": "operation",
                            "elem": "exponential",
                            "split": "all"
                        },
                        "/": {
                            "class": "operation",
                            "elem": "divide",
                            "split": "all"
                        },
                        "//": {
                            "class": "operation",
                            "elem": "divide-floor",
                            "split": "all"
                        },
                        "%": {
                            "class": "operation",
                            "elem": "divide-remainder",
                            "split": "all"
                        },
                        "@": {
                            "class": "operation",
                            "elem": "multiply-matrix",
                            "split": "all"
                        },
                        "<<": {
                            "class": "binary",
                            "elem": "shift-right",
                            "split": "mid"
                        },
                        ">>": {
                            "class": "binary",
                            "elem": "shift-left",
                            "split": "mid"
                        },
                        "&": {
                            "class": "boolean",
                            "elem": "and",
                            "split": "all"
                        },
                        "|": {
                            "class": "boolean",
                            "elem": "or",
                            "split": "all"
                        },
                        "^": {
                            "class": "boolean",
                            "elem": "xor",
                            "split": "all"
                        },
                        "~": {
                            "class": "boolean",
                            "elem": "not",
                            "split": "from"
                        },
                        "<": {
                            "class": "comparison",
                            "elem": "less",
                            "split": "mid"
                        },
                        ">": {
                            "class": "comparison",
                            "elem": "more",
                            "split": "mid"
                        },
                        "<=": {
                            "class": "comparison",
                            "elem": "lesseq",
                            "split": "mid"
                        },
                        ">=": {
                            "class": "comparison",
                            "elem": "moreeq",
                            "split": "mid"
                        },
                        "==": {
                            "class": "comparison",
                            "elem": "equality",
                            "split": "mid"
                        },
                        "!=": {
                            "class": "comparison",
                            "elem": "difference",
                            "split": "mid"
                        }
                    }
                },
                'expressions':{
                    "py3": {
                        "0": {
                            "class": "value",
                            "elem": "num-int"
                        },
                        "-0": {
                            "class": "value",
                            "elem": "num-int-negative"
                        },
                        "0.0": {
                            "class": "value",
                            "elem": "num-float"
                        },
                        "-0.0": {
                            "class": "value",
                            "elem": "num-float-negative"
                        },
                        "x": {
                            "class": "identifier",
                            "elem": "main"
                        },
                        "0x": {
                            "class": "identifier",
                            "elem": "main",
                            "equivalence":"x"
                        },
                        "x.x": {
                            "class": "identifier",
                            "elem": "attribute",
                            "split":"."
                        },
                        "stringQUOTE": {
                            "class": "value",
                            "elem": "text"
                        },
                        "squarPARENTH": {
                            "class": "object",
                            "elem": "list"
                        },
                        "roundPARENTH": {
                            "class": "object",
                            "elem": "set"
                        },
                        "graphPARENTH": {
                            "class": "object",
                            "elem": "dictionary"
                        },
                        "xstringQUOTE": {
                            "class": "value",
                            "elem": "text-encoded"
                        },
                    "xroundPARENTH": {
                            "class": "object",
                            "elem": "function",
                            "split":"unit"
                        },
                        "xsquarPARENTH": {
                            "class": "identifier",
                            "elem": "element",
                            "split":"unit"
                        },
                        "x.xroundPARENTH": {
                            "class": "identifier",
                            "elem": "method",
                            "split":"."
                        },
                        "@x": {
                            "class": "object",
                            "elem": "function-decorator",
                            "split":"fsym"
                        },
                        "%x": {
                            "class": "object",
                            "elem": "magic-line",
                            "split":"fsym"
                        },
                        "%%x": {
                            "class": "object",
                            "elem": "magic-cell",
                            "split":"fsym"
                        }
                    }
                },
                'refSyntax':{
                    "py3": {
                        "assignement-import": {
                            "import-external": {
                                "import-external import-external-1": {
                                    "row": [
                                        True,
                                        True
                                    ],
                                    "pseudo": [
                                        {
                                            "texte": "import"
                                        },
                                        {
                                            "texte": "of",
                                            "accord": "import-external-1"
                                        },
                                        {
                                            "element": "import-external-1"
                                        }
                                    ],
                                    "elements": {
                                        "import-external-1": {
                                            "iter_step": 2,
                                            "type": "output",
                                            "lbl": "package",
                                            "pseudo": [
                                                {
                                                    "element": "lbl",
                                                    "accord": True
                                                },
                                                {
                                                    "element": "name"
                                                }
                                            ],
                                            "accepted": {
                                                "assignement-name": {
                                                    "class": "assignement-action",
                                                    "specific": "iter",
                                                    "retain": True,
                                                    "exclude_sub": ["assignement-name","separator-element"]
                                                },
                                                "identifier-attribute": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "pkg"
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False
                                                },
                                                "separator-element": {
                                                    "class": "action-specific",
                                                    "specific": "iter",
                                                    "retain": True,
                                                    "plural": True
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "import-sub-external": {
                                "import-sub-external import-sub-external-1": {
                                    "row": [
                                        True,
                                        True
                                    ],
                                    "pseudo": [
                                        {
                                            "texte": "import"
                                        },
                                        {
                                            "element": "import-sub-external-1"
                                        }
                                    ],
                                    "elements": {
                                        "import-sub-external-1": {
                                            "iter_step": 2,
                                            "type": "iter",
                                            "accepted": {
                                                "internal-import-external": {
                                                    "class": "assignement-import",
                                                    "specific": "iter"
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "internal-import-external": {
                                "internal-import-external-1 internal-import-external internal-import-external-2": {
                                    "row": [
                                        False
                                    ],
                                    "pseudo": [
                                        {
                                            "texte": "of",
                                            "accord": "internal-import-external-2"
                                        },
                                        {
                                            "element": "internal-import-external-2"
                                        },
                                        {
                                            "texte": "from"
                                        },
                                        {
                                            "element": "internal-import-external-1"
                                        }
                                    ],
                                    "elements": {
                                        "internal-import-external-1": {
                                            "iter_step": 2,
                                            "type": "external",
                                            "lbl": "package",
                                            "pseudo": [
                                                {
                                                    "element": "lbl"
                                                },
                                                {
                                                    "element": "name"
                                                }
                                            ],
                                            "accepted": {
                                                "identifier-attribute": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "pkg"
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False
                                                }
                                            }
                                        },
                                        "internal-import-external-2": {
                                            "iter_step": 2,
                                            "type": "output",
                                            "lbl": "module",
                                            "pseudo": [
                                                {
                                                    "element": "lbl",
                                                    "accord": True
                                                },
                                                {
                                                    "element": "name"
                                                }
                                            ],
                                            "accepted": {
                                                "assignement-name": {
                                                    "class": "assignement-action",
                                                    "specific": "iter",
                                                    "retain": True,
                                                    "exclude_sub": ["assignement-name","separator-element"]
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False
                                                },
                                                "internal-import-external-2-roundPARENTH": {
                                                    "class": None,
                                                    "specific": "iter",
                                                    "retain": True,
                                                    "exclude_sub": ["internal-import-external-2-roundPARENTH"]
                                                },
                                                "operation-multiply": {
                                                    "class": None,
                                                    "condition": "== '*'",
                                                    "specific": "all elements"
                                                },
                                                "separator-element": {
                                                    "class": "action-specific",
                                                    "specific": "iter",
                                                    "retain": True,
                                                    "plural": True
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "assignement-object": {
                            "assignement-variable-global": {
                                "assignement-variable-global assignement-variable-global-1": {
                                    "row": [
                                        True,
                                        True
                                    ],
                                    "pseudo": [
                                        {
                                            "texte": "definition"
                                        },
                                        {
                                            "texte": "of",
                                            "accord": "assignement-variable-global-1"
                                        },
                                        {
                                            "element": "assignement-variable-global-1"
                                        }
                                    ],
                                    "elements": {
                                        "assignement-variable-global-1": {
                                            "iter_step": 2,
                                            "type": "output",
                                            "lbl": "global variable",
                                            "pseudo": [
                                                {
                                                    "element": "lbl",
                                                    "accord": True
                                                },
                                                {
                                                    "element": "name"
                                                }
                                            ],
                                            "accepted": {
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False
                                                },
                                                "separator-element": {
                                                    "class": "action-specific",
                                                    "specific": "iter",
                                                    "retain": True,
                                                    "plural": True
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "assignement-function": {
                                "assignement-function assignement-function-1 assignement-function": {
                                    "row": [
                                        True,
                                        False
                                    ],
                                    "pseudo": [
                                        {
                                            "texte": "definition"
                                        },
                                        {
                                            "texte": "of"
                                        },
                                        {
                                            "element": "assignement-function-1"
                                        }
                                    ],
                                    "elements": {
                                        "assignement-function-1": {
                                            "iter_step": 2,
                                            "type": "iter",
                                            "accepted": {
                                                "assignement-annotation": {
                                                    "class": "assignement-object",
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter",
                                                    "retain": True
                                                }
                                            }
                                        }
                                    }
                                },
                                "assignement-function assignement-function-1 assignement-function assignement-function-2": {
                                    "row": [
                                        True,
                                        False
                                    ],
                                    "pseudo": [
                                        {
                                            "texte": "definition"
                                        },
                                        {
                                            "texte": "of"
                                        },
                                        {
                                            "element": "assignement-function-1"
                                        },
                                        {
                                            "texte": "with one action :"
                                        },
                                        {
                                            "element": "assignement-function-2"
                                        }
                                    ],
                                    "elements": {
                                        "assignement-function-1": {
                                            "iter_step": 2,
                                            "type": "iter",
                                            "accepted": {
                                                "assignement-annotation": {
                                                    "class": "assignement-object",
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter",
                                                    "retain": True
                                                }
                                            }
                                        },
                                        "assignement-function-2": {
                                            "iter_step": 2,
                                            "type": "row",
                                            "accepted": {
                                                "action-execution": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "action-output": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "assignement-from": {
                                                    "class": "assignement-object",
                                                    "specific": "iter"
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "assignement-class": {
                                "assignement-class assignement-class-1 assignement-class": {
                                    "row": [
                                        True,
                                        False
                                    ],
                                    "pseudo": [
                                        {
                                            "texte": "definition"
                                        },
                                        {
                                            "texte": "of"
                                        },
                                        {
                                            "element": "assignement-class-1"
                                        }
                                    ],
                                    "elements": {
                                        "assignement-class-1": {
                                            "iter_step": 2,
                                            "type": "output",
                                            "lbl": "class",
                                            "pseudo": [
                                                {
                                                    "element": "lbl"
                                                },
                                                {
                                                    "element": "name"
                                                }
                                            ],
                                            "accepted": {
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False
                                                },
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter",
                                                    "retain": True
                                                }
                                            }
                                        }
                                    }
                                },
                                "assignement-class assignement-class-1 assignement-class assignement-class-2": {
                                    "row": [
                                        True,
                                        False
                                    ],
                                    "pseudo": [
                                        {
                                            "texte": "definition"
                                        },
                                        {
                                            "texte": "of"
                                        },
                                        {
                                            "element": "assignement-class-1"
                                        },
                                        {
                                            "texte": "with one action :"
                                        },
                                        {
                                            "element": "assignement-class-2"
                                        }
                                    ],
                                    "elements": {
                                        "assignement-class-1": {
                                            "iter_step": 2,
                                            "type": "output",
                                            "lbl": "class",
                                            "pseudo": [
                                                {
                                                    "element": "lbl"
                                                },
                                                {
                                                    "element": "name"
                                                }
                                            ],
                                            "accepted": {
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False
                                                },
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter",
                                                    "retain": True
                                                }
                                            }
                                        },
                                        "assignement-class-2": {
                                            "iter_step": 2,
                                            "type": "row",
                                            "accepted": {
                                                "action-execution": {
                                                    "class": None,
                                                    "specific": "iter"
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "assignement-coroutine-function": {
                                "assignement-coroutine-function assignement-coroutine-function-1 assignement-coroutine-function": {
                                    "row": [
                                        True,
                                        False
                                    ],
                                    "pseudo": [
                                        {
                                            "texte": "definition"
                                        },
                                        {
                                            "texte": "of"
                                        },
                                        {
                                            "element": "assignement-coroutine-function-1"
                                        }
                                    ],
                                    "elements": {
                                        "assignement-coroutine-function-1": {
                                            "iter_step": 2,
                                            "type": "output",
                                            "lbl": "coroutine function",
                                            "pseudo": [
                                                {
                                                    "element": "lbl"
                                                },
                                                {
                                                    "element": "name"
                                                }
                                            ],
                                            "accepted": {
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter",
                                                    "retain": True
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "assignement-from": {
                                "assignement-from-1 assignement-from assignement-from-2": {
                                    "row": [
                                        True,
                                        True
                                    ],
                                    "pseudo": [
                                        {
                                            "texte": "assignement"
                                        },
                                        {
                                            "texte": "of",
                                            "accord": "assignement-from-1"
                                        },
                                        {
                                            "element": "assignement-from-1"
                                        },
                                        {
                                            "texte": "as"
                                        },
                                        {
                                            "element": "assignement-from-2"
                                        }
                                    ],
                                    "elements": {
                                        "assignement-from-1": {
                                            "iter_step": 2,
                                            "type": "output",
                                            "lbl": "local variable",
                                            "pseudo": [
                                                {
                                                    "element": "lbl",
                                                    "accord": True
                                                },
                                                {
                                                    "element": "name"
                                                }
                                            ],
                                            "accepted": {
                                                "assignement-from-1-roundPARENTH": {
                                                    "class": None,
                                                    "specific": "iter",
                                                    "retain": "concat"
                                                },
                                                "identifier-attribute": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "env"
                                                },
                                                "identifier-element": {
                                                    "class": "action-object",
                                                    "specific": "iter",
                                                    "retain": "concat"
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False
                                                },
                                                "separator-element": {
                                                    "class": "action-specific",
                                                    "specific": "iter",
                                                    "retain": "concat",
                                                    "plural": True
                                                }
                                            }
                                        },
                                        "assignement-from-2": {
                                            "iter_step": 2,
                                            "type": "row",
                                            "accepted": {
                                                "action-condition-and": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "action-condition-not": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "action-condition-or": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "action-execution": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "assignement-anonymous-function": {
                                                    "class": "assignement-object",
                                                    "specific": "iter"
                                                },
                                                "assignement-from": {
                                                    "class": "assignement-object",
                                                    "specific": "iter"
                                                },
                                                "assignement-from-2-graphPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "assignement-from-2-roundPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "assignement-from-2-squarPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "boolean-and": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "boolean-not": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "boolean-or": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "code-row-squarPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-difference": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-equality": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-less": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-more": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-moreeq": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-object-inclusion": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "identifier-attribute": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "env"
                                                },
                                                "identifier-element": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "env"
                                                },
                                                "identifier-method": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "internal-action-condition": {
                                                    "class": "action-specific",
                                                    "specific": "iter"
                                                },
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "operation-add": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-divide": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-divide-floor": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-exponential": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-multiply": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-substract": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "separator-element": {
                                                    "class": "action-specific",
                                                    "specific": "iter",
                                                    "plural": True
                                                },
                                                "value-boolean-n": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-boolean-y": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-null": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-num-float": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-num-float-negative": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-num-int": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-num-int-negative": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-text": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-text-encoded": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "assignement-annotation": {
                                "assignement-annotation-1 assignement-annotation assignement-annotation-2": {
                                    "row": [
                                        False
                                    ],
                                    "pseudo": [
                                        {
                                            "element": "assignement-annotation-1"
                                        },
                                        {
                                            "texte": "with"
                                        },
                                        {
                                            "element": "assignement-annotation-2"
                                        }
                                    ],
                                    "elements": {
                                        "assignement-annotation-1": {
                                            "iter_step": 2,
                                            "type": "output",
                                            "accepted": {
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter",
                                                    "retain": True
                                                }
                                            }
                                        },
                                        "assignement-annotation-2": {
                                            "iter_step": 2,
                                            "type": "output",
                                            "lbl": "annotation",
                                            "pseudo": [
                                                {
                                                    "element": "lbl",
                                                    "accord": True
                                                },
                                                {
                                                    "element": "name"
                                                }
                                            ],
                                            "accepted": {
                                                "assignement-annotation-2-roundPARENTH": {
                                                    "class": None,
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "identifier-attribute": {
                                                    "class": None,
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "identifier-element": {
                                                    "class": "action-object",
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False
                                                },
                                                "value-null": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-text": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "assignement-anonymous-function": {
                                "assignement-anonymous-function assignement-anonymous-function-1 assignement-anonymous-function assignement-anonymous-function-2": {
                                    "row": [
                                        False
                                    ],
                                    "pseudo": [
                                        {
                                            "element": "assignement-anonymous-function-1"
                                        },
                                        {
                                            "texte": "with one action:"
                                        },
                                        {
                                            "element": "assignement-anonymous-function-2"
                                        }
                                    ],
                                    "elements": {
                                        "assignement-anonymous-function-1": {
                                            "iter_step": 2,
                                            "type": "output",
                                            "lbl": "anonymous function",
                                            "pseudo": [
                                                {
                                                    "element": "lbl",
                                                    "accord": True
                                                },
                                                {
                                                    "element": "name"
                                                }
                                            ],
                                            "accepted": {
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False
                                                },
                                                "separator-element": {
                                                    "class": "action-specific",
                                                    "specific": "iter",
                                                    "retain": True,
                                                    "plural": True
                                                }
                                            }
                                        },
                                        "assignement-anonymous-function-2": {
                                            "iter_step": 2,
                                            "type": "row",
                                            "accepted": {
                                                "assignement-anonymous-function-2-graphPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "assignement-anonymous-function-2-roundPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "assignement-from": {
                                                    "class": "assignement-object",
                                                    "specific": "iter"
                                                },
                                                "identifier-element": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "env"
                                                },
                                                "identifier-method": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "separator-element": {
                                                    "class": "action-specific",
                                                    "specific": "iter",
                                                    "plural": True
                                                }
                                            }
                                        }
                                    }
                                },
                                "assignement-anonymous-function assignement-anonymous-function-2": {
                                    "row": [
                                        False
                                    ],
                                    "pseudo": [
                                        {
                                            "element": "assignement-anonymous-function-2"
                                        }
                                    ],
                                    "elements": {
                                        "assignement-anonymous-function-2": {
                                            "iter_step": 2,
                                            "type": "output",
                                            "lbl": "anonymous function",
                                            "pseudo": [
                                                {
                                                    "element": "lbl",
                                                    "accord": True
                                                },
                                                {
                                                    "element": "name"
                                                }
                                            ],
                                            "accepted": {
                                                "identifier-method": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "value-boolean-n": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-null": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "assignement-action": {
                            "action-loop-for": {
                                "action-loop-for action-loop-for-1 action-loop-for action-loop-for-2 action-loop-for": {
                                    "row": [
                                        True,
                                        False
                                    ],
                                    "pseudo": [
                                        {
                                            "texte": "for each"
                                        },
                                        {
                                            "element": "action-loop-for-1"
                                        },
                                        {
                                            "texte": "in"
                                        },
                                        {
                                            "element": "action-loop-for-2"
                                        }
                                    ],
                                    "elements": {
                                        "action-loop-for-1": {
                                            "iter_step": 2,
                                            "type": "output",
                                            "lbl": "variable",
                                            "pseudo": [
                                                {
                                                    "element": "lbl",
                                                    "accord": True
                                                },
                                                {
                                                    "element": "name"
                                                }
                                            ],
                                            "accepted": {
                                                "action-loop-for-1-roundPARENTH": {
                                                    "class": None,
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False
                                                },
                                                "separator-element": {
                                                    "class": "action-specific",
                                                    "specific": "iter",
                                                    "retain": True,
                                                    "plural": True
                                                }
                                            }
                                        },
                                        "action-loop-for-2": {
                                            "iter_step": 2,
                                            "type": "input",
                                            "accepted": {
                                                "action-condition-or": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "action-loop-for-2-roundPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "action-loop-for-2-squarPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "boolean-and": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "identifier-attribute": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "env"
                                                },
                                                "identifier-element": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "env"
                                                },
                                                "identifier-method": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "operation-add": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "value-text": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                }
                                            }
                                        }
                                    }
                                },
                                "action-loop-for action-loop-for-1 action-loop-for action-loop-for-2 action-loop-for action-loop-for-3": {
                                    "row": [
                                        True,
                                        False
                                    ],
                                    "pseudo": [
                                        {
                                            "texte": "for each"
                                        },
                                        {
                                            "element": "action-loop-for-1"
                                        },
                                        {
                                            "texte": "in"
                                        },
                                        {
                                            "element": "action-loop-for-2"
                                        },
                                        {
                                            "texte": "execution of one action:"
                                        },
                                        {
                                            "element": "action-loop-for-3"
                                        }
                                    ],
                                    "elements": {
                                        "action-loop-for-1": {
                                            "iter_step": 2,
                                            "type": "output",
                                            "lbl": "variable",
                                            "pseudo": [
                                                {
                                                    "element": "lbl",
                                                    "accord": True
                                                },
                                                {
                                                    "element": "name"
                                                }
                                            ],
                                            "accepted": {
                                                "action-loop-for-1-roundPARENTH": {
                                                    "class": None,
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False
                                                },
                                                "separator-element": {
                                                    "class": "action-specific",
                                                    "specific": "iter",
                                                    "retain": True,
                                                    "plural": True
                                                }
                                            }
                                        },
                                        "action-loop-for-2": {
                                            "iter_step": 2,
                                            "type": "input",
                                            "accepted": {
                                                "action-condition-or": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "action-loop-for-2-graphPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "action-loop-for-2-roundPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "action-loop-for-2-squarPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "boolean-and": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "identifier-attribute": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "env"
                                                },
                                                "identifier-element": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "env"
                                                },
                                                "identifier-method": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "operation-add": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "value-text": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                }
                                            }
                                        },
                                        "action-loop-for-3": {
                                            "iter_step": 2,
                                            "type": "row",
                                            "accepted": {
                                                "identifier-method": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "assignement-name": {
                                "assignement-name-1 assignement-name assignement-name-2": {
                                    "row": [
                                        False
                                    ],
                                    "pseudo": [
                                        {
                                            "element": "assignement-name-1"
                                        },
                                        {
                                            "texte": "with"
                                        },
                                        {
                                            "element": "assignement-name-2"
                                        }
                                    ],
                                    "elements": {
                                        "assignement-name-1": {
                                            "iter_step": 2,
                                            "type": "heritage",
                                            "lbl": "heritage",
                                            "pseudo": [
                                                {
                                                    "element": "lbl",
                                                    "accord": True
                                                },
                                                {
                                                    "element": "name"
                                                }
                                            ],
                                            "accepted": {
                                                "identifier-attribute": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False
                                                },
                                                "identifier-method": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                }
                                            }
                                        },
                                        "assignement-name-2": {
                                            "iter_step": 2,
                                            "type": "output",
                                            "lbl": "name",
                                            "pseudo": [
                                                {
                                                    "element": "lbl",
                                                    "accord": True
                                                },
                                                {
                                                    "element": "name"
                                                }
                                            ],
                                            "accepted": {
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "internal-action-loop-for": {
                                "internal-action-loop-for-1 internal-action-loop-for internal-action-loop-for-2 internal-action-loop-for internal-action-loop-for-3": {
                                    "row": [
                                        False
                                    ],
                                    "pseudo": [
                                        {
                                            "element": "internal-action-loop-for-1"
                                        },
                                        {
                                            "texte": "for each"
                                        },
                                        {
                                            "element": "internal-action-loop-for-2"
                                        },
                                        {
                                            "texte": "in"
                                        },
                                        {
                                            "element": "internal-action-loop-for-3"
                                        }
                                    ],
                                    "elements": {
                                        "internal-action-loop-for-1": {
                                            "iter_step": 2,
                                            "type": "row",
                                            "accepted": {
                                                "comparison-difference": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-equality": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "identifier-attribute": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "env"
                                                },
                                                "identifier-method": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "internal-action-loop-for-1-roundPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "operation-add": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "unique-separator-assignement": {
                                                    "class": None,
                                                    "specific": "iter"
                                                }
                                            }
                                        },
                                        "internal-action-loop-for-2": {
                                            "iter_step": 2,
                                            "type": "output",
                                            "lbl": "variable",
                                            "pseudo": [
                                                {
                                                    "element": "lbl",
                                                    "accord": True
                                                },
                                                {
                                                    "element": "name"
                                                }
                                            ],
                                            "accepted": {
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False
                                                },
                                                "separator-element": {
                                                    "class": "action-specific",
                                                    "specific": "iter",
                                                    "retain": "concat",
                                                    "plural": True
                                                }
                                            }
                                        },
                                        "internal-action-loop-for-3": {
                                            "iter_step": 2,
                                            "type": "input",
                                            "accepted": {
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "env"
                                                },
                                                "identifier-method": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "internal-action-condition": {
                                                    "class": "action-specific",
                                                    "specific": "iter"
                                                },
                                                "internal-action-loop-for-3-squarPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "operation-add": {
                                                    "class": None,
                                                    "specific": "iter"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "action-contextual": {
                            "assignement-context": {
                                "assignement-context assignement-context-1 assignement-context": {
                                    "row": [
                                        True,
                                        False
                                    ],
                                    "pseudo": [
                                        {
                                            "texte": "with"
                                        },
                                        {
                                            "element": "assignement-context-1"
                                        }
                                    ],
                                    "elements": {
                                        "assignement-context-1": {
                                            "iter_step": 2,
                                            "type": "input",
                                            "lbl": "context",
                                            "pseudo": [
                                                {
                                                    "element": "lbl",
                                                    "accord": True
                                                },
                                                {
                                                    "element": "name"
                                                }
                                            ],
                                            "accepted": {
                                                "assignement-name": {
                                                    "class": "assignement-action",
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "identifier-attribute": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "env"
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "env"
                                                },
                                                "identifier-method": {
                                                    "class": "action-object",
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "separator-element": {
                                                    "class": "action-specific",
                                                    "specific": "iter",
                                                    "retain": True,
                                                    "plural": True
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "action-loop-while": {
                                "action-loop-while action-loop-while-1 action-loop-while": {
                                    "row": [
                                        True,
                                        False
                                    ],
                                    "pseudo": [
                                        {
                                            "texte": "while"
                                        },
                                        {
                                            "element": "action-loop-while-1"
                                        }
                                    ],
                                    "elements": {
                                        "action-loop-while-1": {
                                            "iter_step": 2,
                                            "type": "input",
                                            "accepted": {
                                                "action-condition-and": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "action-condition-not": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "action-condition-or": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "action-loop-while-1-roundPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-difference": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-equality": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-less": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-lesseq": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-more": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-moreeq": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-object-exclusion": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "identifier-attribute": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "env"
                                                },
                                                "identifier-method": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "value-boolean-y": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "action-object": {
                            "identifier-element": {
                                "identifier-element-1 identifier-element-squarPARENTH": {
                                    "row": [
                                        True,
                                        True
                                    ],
                                    "pseudo": [
                                        {
                                            "texte": "element",
                                            "accord": "identifier-element-squarPARENTH"
                                        },
                                        {
                                            "element": "identifier-element-squarPARENTH"
                                        },
                                        {
                                            "texte": "of",
                                            "accord": "identifier-element-1"
                                        },
                                        {
                                            "element": "identifier-element-1"
                                        }
                                    ],
                                    "elements": {
                                        "identifier-element-1": {
                                            "iter_step": 0,
                                            "type": "heritage",
                                            "lbl": "heritage",
                                            "pseudo": [
                                                {
                                                    "element": "lbl"
                                                },
                                                {
                                                    "element": "name"
                                                }
                                            ]
                                        },
                                        "identifier-element-squarPARENTH": {
                                            "iter_step": 2,
                                            "type": "iter",
                                            "accepted": {
                                                "boolean-and": {
                                                    "class": None,
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "boolean-not": {
                                                    "class": None,
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "boolean-or": {
                                                    "class": None,
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "comparison-equality": {
                                                    "class": None,
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "comparison-lesseq": {
                                                    "class": None,
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "comparison-more": {
                                                    "class": None,
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "comparison-moreeq": {
                                                    "class": None,
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "identifier-attribute": {
                                                    "class": None,
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "identifier-element": {
                                                    "class": "action-object",
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "identifier-element-squarPARENTH-roundPARENTH": {
                                                    "class": None,
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "identifier-element-squarPARENTH-squarPARENTH": {
                                                    "class": None,
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "env"
                                                },
                                                "identifier-method": {
                                                    "class": "action-object",
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "operation-add": {
                                                    "class": None,
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "operation-substract": {
                                                    "class": None,
                                                    "specific": "iter",
                                                    "retain": True
                                                },
                                                "separator-element": {
                                                    "class": "action-specific",
                                                    "specific": "iter",
                                                    "retain": True,
                                                    "plural": True
                                                },
                                                "value-num-int": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-num-int-negative": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-text": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-text-encoded": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "identifier-method": {
                                "identifier-method-1 identifier-method object-function": {
                                    "row": [
                                        True,
                                        True
                                    ],
                                    "pseudo": [
                                        {
                                            "texte": "method",
                                            "accord": "object-function"
                                        },
                                        {
                                            "element": "object-function"
                                        },
                                        {
                                            "texte": "of",
                                            "accord": "identifier-method-1"
                                        },
                                        {
                                            "element": "identifier-method-1"
                                        }
                                    ],
                                    "elements": {
                                        "identifier-method-1": {
                                            "iter_step": 0,
                                            "type": "heritage",
                                            "lbl": "heritage",
                                            "pseudo": [
                                                {
                                                    "element": "lbl"
                                                },
                                                {
                                                    "element": "name"
                                                }
                                            ]
                                        },
                                        "object-function": {
                                            "iter_step": 1,
                                            "type": "iter"
                                        }
                                    }
                                }
                            },
                            "object-function-decorator": {
                                "object-function-decorator object-function-decorator-1": {
                                    "row": [
                                        True,
                                        False
                                    ],
                                    "pseudo": [
                                        {
                                            "texte": "application"
                                        },
                                        {
                                            "texte": "of",
                                            "accord": "object-function-decorator-1"
                                        },
                                        {
                                            "element": "object-function-decorator-1"
                                        }
                                    ],
                                    "elements": {
                                        "object-function-decorator-1": {
                                            "iter_step": 0,
                                            "type": "input",
                                            "lbl": "function decorator",
                                            "pseudo": [
                                                {
                                                    "element": "lbl"
                                                },
                                                {
                                                    "element": "name"
                                                }
                                            ]
                                        }
                                    }
                                }
                            },
                            "object-function": {
                                "object-function-1 object-function-roundPARENTH": {
                                    "row": [
                                        True,
                                        True
                                    ],
                                    "pseudo": [
                                        {
                                            "element": "object-function-1"
                                        },
                                        {
                                            "texte": "with"
                                        },
                                        {
                                            "element": "object-function-roundPARENTH"
                                        }
                                    ],
                                    "elements": {
                                        "object-function-1": {
                                            "iter_step": 0,
                                            "type": "heritage",
                                            "lbl": "function",
                                            "pseudo": [
                                                {
                                                    "element": "lbl"
                                                },
                                                {
                                                    "element": "name"
                                                }
                                            ]
                                        },
                                        "object-function-roundPARENTH": {
                                            "iter_step": 2,
                                            "type": "iter",
                                            "lbl": "parameter",
                                            "pseudo": [
                                                {
                                                    "element": "lbl",
                                                    "accord": True
                                                },
                                                {
                                                    "element": "name"
                                                }
                                            ],
                                            "accepted": {
                                                "": {
                                                    "class": None,
                                                    "specific": "no parameter"
                                                },
                                                "action-condition-or": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "assignement-anonymous-function": {
                                                    "class": "assignement-object",
                                                    "specific": "iter"
                                                },
                                                "assignement-from": {
                                                    "class": "assignement-object",
                                                    "specific": "iter"
                                                },
                                                "boolean-or": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-difference": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-equality": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-more": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-object-inclusion": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "identifier-attribute": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "identifier-element": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False
                                                },
                                                "identifier-method": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "internal-action-condition": {
                                                    "class": "action-specific",
                                                    "specific": "iter"
                                                },
                                                "internal-action-loop-for": {
                                                    "class": "assignement-action",
                                                    "specific": "iter"
                                                },
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "object-function-roundPARENTH-graphPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "object-function-roundPARENTH-roundPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "object-function-roundPARENTH-squarPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-add": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-divide": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-exponential": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-multiply": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-substract": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "separator-element": {
                                                    "class": "action-specific",
                                                    "specific": "iter",
                                                    "plural": True
                                                },
                                                "value-boolean-n": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-boolean-y": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-null": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-num-float": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-num-int": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-num-int-negative": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-text": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-text-encoded": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "action-specific": {
                            "separator-element": {
                                "separator-element-1 separator-element separator-element-2": {
                                    "row": [
                                        True,
                                        True
                                    ],
                                    "pseudo": [
                                        {
                                            "element": "separator-element-1"
                                        },
                                        {
                                            "texte": "and"
                                        },
                                        {
                                            "element": "separator-element-2"
                                        }
                                    ],
                                    "elements": {
                                        "separator-element-1": {
                                            "iter_step": 2,
                                            "type": "heritage",
                                            "lbl": "heritage",
                                            "accepted": {
                                                "action-condition-or": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "assignement-from": {
                                                    "class": "assignement-object",
                                                    "specific": "iter"
                                                },
                                                "assignement-name": {
                                                    "class": "assignement-action",
                                                    "specific": "iter"
                                                },
                                                "comparison-more": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "identifier-attribute": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "identifier-element": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False
                                                },
                                                "identifier-method": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "internal-action-condition": {
                                                    "class": "action-specific",
                                                    "specific": "iter"
                                                },
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "operation-add": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-divide": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-divide-floor": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-divide-remainder": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-exponential": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-multiply": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-substract": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "separator-element-1-graphPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "separator-element-1-roundPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "separator-element-1-squarPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "value-boolean-n": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-boolean-y": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-null": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-num-float": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-num-float-negative": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-num-int": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-num-int-negative": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-text": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-text-encoded": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                }
                                            }
                                        },
                                        "separator-element-2": {
                                            "iter_step": 2,
                                            "type": "heritage",
                                            "lbl": "heritage",
                                            "accepted": {
                                                "assignement-anonymous-function": {
                                                    "class": "assignement-object",
                                                    "specific": "iter"
                                                },
                                                "assignement-from": {
                                                    "class": "assignement-object",
                                                    "specific": "iter"
                                                },
                                                "assignement-name": {
                                                    "class": "assignement-action",
                                                    "specific": "iter"
                                                },
                                                "identifier-attribute": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "identifier-element": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False
                                                },
                                                "identifier-method": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "internal-action-condition": {
                                                    "class": "action-specific",
                                                    "specific": "iter"
                                                },
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "operation-add": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-divide": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-exponential": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-multiply": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-substract": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "separator-element": {
                                                    "class": "action-specific",
                                                    "specific": "iter"
                                                },
                                                "separator-element-2-graphPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "separator-element-2-roundPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "separator-element-2-squarPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "value-boolean-n": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-boolean-y": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-null": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-num-float": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-num-float-negative": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-num-int": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-num-int-negative": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-text": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-text-encoded": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                }
                                            }
                                        }
                                    }
                                },
                                "separator-element-1 separator-element": {
                                    "row": [
                                        True,
                                        True
                                    ],
                                    "pseudo": [
                                        {
                                            "element": "separator-element-1"
                                        }
                                    ],
                                    "elements": {
                                        "separator-element-1": {
                                            "iter_step": 2,
                                            "type": "heritage",
                                            "lbl": "heritage",
                                            "accepted": {
                                                "assignement-from": {
                                                    "class": "assignement-object",
                                                    "specific": "iter"
                                                },
                                                "identifier-attribute": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "identifier-element": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "env"
                                                },
                                                "identifier-method": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "internal-action-condition": {
                                                    "class": "action-specific",
                                                    "specific": "iter"
                                                },
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "operation-multiply": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "separator-element-1-graphPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "separator-element-1-roundPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "separator-element-1-squarPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "value-boolean-n": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-boolean-y": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-null": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-num-float": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-num-int": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-text": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-text-encoded": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "internal-action-condition": {
                                "internal-action-condition-1 internal-action-condition internal-action-condition-2 internal-action-condition internal-action-condition-3": {
                                    "row": [
                                        True,
                                        True
                                    ],
                                    "pseudo": [
                                        {
                                            "element": "internal-action-condition-1"
                                        },
                                        {
                                            "texte": "if"
                                        },
                                        {
                                            "element": "internal-action-condition-2"
                                        },
                                        {
                                            "texte": "else"
                                        },
                                        {
                                            "element": "internal-action-condition-3"
                                        }
                                    ],
                                    "elements": {
                                        "internal-action-condition-1": {
                                            "iter_step": 2,
                                            "type": "row",
                                            "accepted": {
                                                "assignement-from": {
                                                    "class": "assignement-object",
                                                    "specific": "iter"
                                                },
                                                "identifier-attribute": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "identifier-element": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "env"
                                                },
                                                "identifier-method": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "internal-action-condition-1-graphPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "internal-action-condition-1-roundPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "internal-action-condition-1-squarPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "operation-add": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-divide": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-multiply": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-substract": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "value-boolean-n": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-boolean-y": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-null": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-num-int": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-text": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                }
                                            }
                                        },
                                        "internal-action-condition-2": {
                                            "iter_step": 2,
                                            "type": "input",
                                            "accepted": {
                                                "action-condition-and": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "action-condition-not": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-difference": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-equality": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-less": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-more": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-object-difference": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-object-equality": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-object-inclusion": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "identifier-attribute": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "env"
                                                },
                                                "identifier-method": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "internal-action-condition-2-roundPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                }
                                            }
                                        },
                                        "internal-action-condition-3": {
                                            "iter_step": 2,
                                            "type": "row",
                                            "accepted": {
                                                "identifier-attribute": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "identifier-main": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "env"
                                                },
                                                "identifier-method": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "internal-action-condition-3-roundPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "internal-action-condition-3-squarPARENTH": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "object-function": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                },
                                                "operation-add": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-divide": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "operation-substract": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "value-boolean-n": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-boolean-y": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-null": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-num-float": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-num-int": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-num-int-negative": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                },
                                                "value-text": {
                                                    "class": None,
                                                    "specific": False,
                                                    "refdict": "val"
                                                }
                                            }
                                        }
                                    }
                                },
                                "internal-action-condition-1 internal-action-condition internal-action-condition-2": {
                                    "row": [
                                        False
                                    ],
                                    "pseudo": [
                                        {
                                            "element": "internal-action-condition-1"
                                        },
                                        {
                                            "texte": "if"
                                        },
                                        {
                                            "element": "internal-action-condition-2"
                                        }
                                    ],
                                    "elements": {
                                        "internal-action-condition-1": {
                                            "iter_step": 2,
                                            "type": "row",
                                            "accepted": {
                                                "identifier-method": {
                                                    "class": "action-object",
                                                    "specific": "iter"
                                                }
                                            }
                                        },
                                        "internal-action-condition-2": {
                                            "iter_step": 2,
                                            "type": "input",
                                            "accepted": {
                                                "comparison-object-inclusion": {
                                                    "class": None,
                                                    "specific": "iter"
                                                },
                                                "comparison-difference": {
                                                    "class": None,
                                                    "specific": "iter"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

format_dicts = {
                'colors':{
                          "standard":"#BABABA",
                          "to_check":"#FF0000",
                          "fwd":"#E5C48B",
                          "kwd":"#EAD6B3",
                          "sym":"#EEE9E1",
                          "output":"#2596be",
                          "input":"#B3E0EA",
                          "comment":"#49be25",
                          "text":"#E567A6",
                          "num":"#EAB3CF"
                          },
                'pseudo':{}
            }