#####################################################################################################
###-                                         PYTHON UDFs                                         -###
#####################################################################################################

def datetime_parser(outv,inOut):
    from datetime import datetime as dt
    try:
        if inOut=='in':
            outv = dt.strptime(outv, "%Y-%m-%dT%H:%M:%S")
        elif inOut=='out':
            outv = outv.isoformat(timespec='seconds')
    except:
        pass
    return outv

def dict_parser_recursive(dct,inOut):
    for (key, value) in dct.items():
        if type(value) is dict :
            dict_parser_recursive(value,inOut)
        else :
            dct[key] = datetime_parser(value,inOut)
    return dct

def rw_json(filename, rw='r', data=None, indent=4) :
    import json
    if rw == 'r' :
        with open(filename, rw) as f:
            output = json.load(f)
        return dict_parser_recursive(output,'in')
    elif rw == 'w' :
        with open(filename, rw) as f:
            json.dump(dict_parser_recursive(data.copy(),'out'),f,indent=indent)
    else :
        return None

def iter_print_dict(in_dict,start=None,end=None,indent='',sort_keys=False) :
    to_print = start == None
    if sort_keys == True : iter_keys = sorted(in_dict.keys())
    else : iter_keys = in_dict.keys()
    for k in iter_keys :
        if not to_print and k == start : to_print = True
        if to_print :
            print(indent,'---',k,'---')
            if type(in_dict[k]) is dict :
                iter_print_dict(in_dict[k],None,None,indent+'  ',sort_keys)
            elif type(in_dict[k]) is str :
                print(indent+'     ->',in_dict[k])
            elif type(in_dict[k]) in [set,list] :
                for c in in_dict[k] :
                    print(indent+'     ->',c)
            else :
                print(indent+'     ->',str(in_dict[k]))
        if end != None and k == end :
            break

###########################################- MODELS -###########################################

#- 'linebreaks','continuations','syms','enclosers','quotes','comments','firstwords','keywords','delimiters','operators','refSyntax'
def get_syntax(obj_type,lang_interpreter,*args) :
    from .dicts import syntax_dicts
    out = syntax_dicts[obj_type][lang_interpreter]
    if obj_type == 'enclosers' and len(args)>0 and args[0] :
        return {v['type']:{'open':k,'close':v['close']} for k,v in out.items()}
    else :
        return out

def get_assignement_delimiters(cur_intp):
    return [sym for sym,v in get_syntax('delimiters',cur_intp).items() if 'class' in v and v['class'] == 'assignement']

def get_expressions_base(cur_intp) :
    return get_syntax('expressions',cur_intp)


##########################################- PACKAGES -###########################################

##- Base

import string
import secrets
import random


import re

###########################################- SESSIONS -###########################################

#- Log printer

def to_print_alert() : return ['mainLog','executionLog','dictionnaryError','technicalDebug','technicalWarning','inputDebug'] 
def no_print_alert() : return ['iterLog', 'syntaxUpdate', 'inputWarning'] #- !! 'iterLog' (commenté dans le code)

def update_log(*args) :
    from datetime import datetime as dt
    if len(args) == 1 and args[0] == 'first' :
        if 'cur_log' not in globals() :
            global cur_log
        cur_log = '--- LOG ---'
    elif len(args) == 1 and args[0] == 'last' :
        del cur_log
    else :
        alert_type = args[0]
        print_log = ' '.join([str(a) for a in [dt.now() if x == '-GCE-timestamp-' else x for x in args[1:]]])
        cur_log += '\n' + print_log
        if alert_type in to_print_alert() : print(print_log)
        elif alert_type not in no_print_alert() : print('UNEXPECTED alert type :',alert_type)

def iter_logger(iter_step,iter_cnt,nIter_print = 5000) :
    if int(iter_cnt / nIter_print) == (iter_cnt / nIter_print) : update_log('iterLog',iter_step,' - Running Iteration :',iter_cnt)

#- Key generator

def get_random_ascii() :
    return random.choice([string.ascii_lowercase, string.ascii_uppercase, string.digits])

def generate_random_key(klen=5) :
    return ''.join([secrets.choice(get_random_ascii()) for _ in range(klen)])

def create_rep_code(step='get',in_rep_code='') :
    if step == 'first' :
        if 'cur_key' not in globals() :
            global cur_key
        cur_key = generate_random_key()
    elif step == 'last' :
        del cur_key
    elif step == 'get' :
        return '$'+cur_key+in_rep_code+cur_key+'$'

###########################################-   UTIL   -###########################################

########################- GENERAL UDFs -########################

#- Number manipulation

def is_odd(num):
    return (num % 2) != 0

def is_even(num):
    return (num % 2) == 0

def sign(int1,int2):
    if int1 > int2 :
        out = 1
    elif int1 < int2 :
        out = -1
    else :
        out = 0
    return out

def is_numeric(entry):
    try :
        float(entry)
    except :
        out = False
    else :
        out = True
    return out        

def is_integer(entry) :
    try :
        int(entry)
    except :
        out = False
    else :
        out = True
    return out        

def is_division_int(numerator,denominator) :
    return float(int(numerator/denominator)) == numerator/denominator

#- String manipulation

def is_slash(txt,pos) :
    n = 0
    while pos >= 0 and txt[pos] == '\\' :
        n += 1
        #- iter_logger('is_slash',n)
        pos -= 1
    return is_odd(n)

def count_symbol(inputTxt,inputSymbol) :
    syCnt = 0
    if len(inputSymbol) > 0 :
        i = 0
        #- iter_cnt = 0
        while i < len(inputTxt) :
            #- iter_cnt += 1
            #- iter_logger('count_symbol',iter_cnt,500000)
            if inputTxt[i:i+len(inputSymbol)] == inputSymbol and not is_slash(inputTxt,i-1) :
                syCnt += 1
                i += len(inputSymbol)
            else :
                i += 1
    else :
        update_log('technicalWarning','UNEXPECTED ERROR : no symbol to count ( %s )' % inputSymbol)
    return syCnt

def find_symbol(inputTxt,inputSymbol) :
    syPos = -1
    if len(inputSymbol) > 0 :
        i = 0
        #- iter_cnt = 0
        while i < len(inputTxt) :
            #- iter_cnt += 1
            #- iter_logger('find_symbol',iter_cnt,500000)
            if inputTxt[i:i+len(inputSymbol)] == inputSymbol and not is_slash(inputTxt,i-1) :
                syPos = i
                break
            else :
                i += 1
    else :
        update_log('technicalWarning','UNEXPECTED ERROR : no symbol to count ( %s )' % inputSymbol)
    return syPos

def trim_start(txt):
    if re.search(r'[^\s]', txt) :
        return txt[re.search(r'[^\s]', txt).start():]
    else :
        return ''

def get_indent(codeRow):
    match = re.search(r'[^\s]', codeRow)
    return match.start()*(4 if codeRow.startswith('\t') else 1) if match else -1

def update_min(match,curMin):
    if match and match.start() < curMin :
        curMin = match.start()
    return curMin

#- List manipulation

def order_by_nbchar(origin_list, reverse = False) :
    sorted_list = []
    for l in sorted(list(set(len(str(x)) for x in origin_list)), reverse = reverse) :
        sorted_list.extend([x for x in origin_list if len(str(x)) == l])
    return sorted_list

#- Dict manipulation

def get_keys_min_val(in_dict) :
    minVal = min(in_dict.values())
    return [k for k,v in in_dict.items() if v == minVal]

########################- REGEX UDFs -########################

#NEW-NOT YET USED
def isolate_symbol(inputTxt,inputSymbol,inputRep) :
    isolatedTxt = ''
    if len(inputSymbol) > 0 :
        i = 0
        #- iter_cnt = 0
        while i < len(inputTxt) :
            #- iter_cnt += 1
            #- iter_logger('isolate_symbol',iter_cnt)
            if inputTxt[i:i+len(inputSymbol)] == inputSymbol and not is_slash(inputTxt,i-1) :
                isolatedTxt += inputRep
                i += len(inputSymbol)
            else :
                isolatedTxt += inputTxt[i]
                i += 1
    else :
        update_log('technicalWarning','UNEXPECTED ERROR : no symbol to count ( %s )' % inputSymbol)
    return isolatedTxt


def isolate_text(inputString,cur_intp,keepReplacement=False):
    dict_quotes = get_syntax('quotes',cur_intp)
    n = 0
    if keepReplacement :
        replacementText = {}
    isolatedString = inputString
    exitLoop = False
    #- iter_cnt = 0
    while not exitLoop :
        #- iter_cnt += 1
        #- iter_logger('isolate_text',iter_cnt)
        quotes_found = {sym:find_symbol(isolatedString,sym) for sym in dict_quotes.keys() if count_symbol(isolatedString,sym) > 0}
        if len(quotes_found) == 0 :
            outQuote = {'outQuote':None,'outQuote_pos':None}
            exitLoop = True
        else :
            quote = order_by_nbchar(get_keys_min_val(quotes_found),True)[0]
            quoteStart = quotes_found[quote]
            tmp = isolatedString[quoteStart+len(quote):]
            n+=1
            if find_symbol(tmp,quote) == -1 :
                replacement = create_rep_code('get','lastQUOTEn'+str(n)) #-- ADD rep_code
                quoteTxt = quote
                isolatedString = isolatedString[:quoteStart]+replacement+isolatedString[quoteStart+len(quote):]
                outQuote = {'outQuote':quote,'outQuote_pos':quoteStart}
                exitLoop = True
                if keepReplacement :
                    replacementText[replacement] = quoteTxt
            elif not is_slash(tmp,find_symbol(tmp,quote)-1) :
                replacement = create_rep_code('get','stringQUOTEn'+str(n)) #-- ADD rep_code
                quoteTxt = quote+tmp[:find_symbol(tmp,quote)]+quote
                isolatedString = isolatedString[:quoteStart]+replacement+tmp[find_symbol(tmp,quote)+len(quote):]
                if keepReplacement :
                    replacementText[replacement] = quoteTxt
            else :
                update_log('inputDebug','IMPOSSIBLE CASE TO CHECK')
    
    if keepReplacement :
        return isolatedString,replacementText
    else:
        return isolatedString,outQuote

def inject_text(isolatedString,replacementText):
    inputString = isolatedString
    for k,v in replacementText.items():
        inputString = inputString.replace(k,v)
    return inputString

def get_parentheses_content(text,openPar,closePar):
    content = ''
    countOpen = 1
    countClose = 0
    for char in text[1:] :
        if char == openPar :
            countOpen += 1
        elif char == closePar :
            countClose += 1
        if countOpen > countClose :
            content += char
        else :
            break
    out = None
    if countOpen == countClose :
        out = content
    return out

def get_corresp(elems,contents) :
    cur_content, open_content, cur_len, corresp = 0, False, 0, []
    i = 0
    while i < len(elems) :
        len_el = elems[i]
        if cur_content >= len(contents) :
            corresp.append(None)
            i+=1
        else :
            if not open_content :
                if cur_len < contents[cur_content][0] :
                    corresp.append(None)
                    i+=1
                    cur_len += len_el
                else :
                    if cur_len != contents[cur_content][0] :
                        update_log('technicalDebug','IMPOSSIBLE CASE IN get_corresp open :',cur_len,'!=',contents[cur_content][0],corresp,cur_content)            
                    open_content = True
                    cmp_len = 0
            else :
                cmp_len += len_el
                if cmp_len <= contents[cur_content][1] :
                    corresp.append(cur_content)
                    i+=1
                    cur_len += len_el
                else :
                    if cmp_len != (contents[cur_content][1]+1) :
                        update_log('technicalDebug','IMPOSSIBLE CASE IN get_corresp not open :',cmp_len,'!=',contents[cur_content][1],corresp,cur_content)            
                    cur_content += 1
                    open_content = False
    return corresp

def reduceRegex(txtIn) :
    if len(set(txtIn)-set(['X','x','0','_'])) == 0 :
        txtOut = txtIn.replace('X','x').replace('_','x')
        return ''.join(sorted(set(txtOut)))
    else :
        return txtIn

def buildRegex(txt) :
    out_rgx = []
    cur_el = None
    cur_rgx = []
    cur_out = {'txt_rgx':'','start':None,'end':None}
    for i,el in enumerate(['X' if str(c).isalpha() and str(c).upper()==c else 'x' if str(c).isalpha() else '0' if str(c).isdigit() else c for c in txt]) :
        if el in ['X','x','0','_'] :
            if not cur_el :
                cur_rgx.append(el)
                cur_el = el
                cur_out['start'] = i
            elif cur_el != el :
                cur_rgx.append(el)
                cur_el = el
            if i == (len(txt)-1) :
                cur_out['txt_rgx'] = ''.join(cur_rgx)
                cur_out['end'] = i+1
                out_rgx.append(cur_out)
        elif not cur_el :
            out_rgx.append({'txt_rgx':el,'start':i,'end':i+1})
        else :
            cur_out['txt_rgx'] = ''.join(cur_rgx)
            cur_out['end'] = i
            out_rgx.append(cur_out)
            out_rgx.append({'txt_rgx':el,'start':i,'end':i+1})
            cur_el = None
            cur_rgx = []
            cur_out = {'txt_rgx':'','start':None,'end':None}
    for d in out_rgx :
        d['reduce_rgx'] = reduceRegex(d['txt_rgx'])
    cur_el = None
    cur_reducted = -1
    for d in out_rgx :
        if d['txt_rgx'] == cur_el :
            d['reduction'] = cur_reducted
        else :
            cur_reducted += 1
            d['reduction'] = cur_reducted
            cur_el = d['txt_rgx']
    return out_rgx

########################- SPECIFIC UDFs -########################

#- Cleaning Script

def remove_lineBreak(inputRow, cur_intp):
    outRow = inputRow
    for lbrk in get_syntax('linebreaks',cur_intp) :
        if inputRow.endswith(lbrk) :
            outRow = inputRow[:-len(lbrk)]
            break
    return outRow

def is_continuing(row,cur_intp):
    row_cont = False
    for sym in get_syntax('continuations',cur_intp).keys() :
        if row.endswith(sym) :
            row_cont = True
            break
    return row_cont

def is_full_comment(row,cur_intp) :
    commentFull = None
    dict_comments = get_syntax('comments',cur_intp)
    comments_found = [sym for sym in dict_comments.keys() if find_symbol(row,sym) == 0]
    if len(comments_found) > 0 :
        commentFull = False
        cms = order_by_nbchar(comments_found, reverse = True)[0]
        cme = dict_comments[cms]['close']
        if cme == 'linebreak' or ( row.endswith(cme) and ( ( cme == cms and count_symbol(row,cms) == 2 ) or \
                                                           ( cme != cms and count_symbol(row,cms) == count_symbol(row,cme) == 1 ) ) ) :
            commentFull = True
    return commentFull

def get_pos_from_isolated(inputTxt,isolatedPos,cur_intp) :
    isolatedString,replacementText = isolate_text(inputTxt,cur_intp,keepReplacement=True)
    return len(inject_text(isolatedString[:isolatedPos],replacementText))

def contain_comment(row,cur_intp,get_detail = False):
    comment_found, comment_type = None, None
    dict_comments = get_syntax('comments',cur_intp)
    comments_found = {sym:find_symbol(row,sym) for sym in dict_comments.keys() if count_symbol(row,sym) > 0}
    if len(comments_found) > 0 :
        cms = order_by_nbchar(get_keys_min_val(comments_found),True)[0]
        cme = dict_comments[cms]['close']
        comment_found, comment_type = cms, {'openComment':None,'startComment_pos':comments_found[cms]}
        if comments_found[cms] == 0 : 
            if not row.startswith(cms) : update_log('technicalDebug','IMPOSSIBLE CASE : found 0 and not startswith',cms,'in', row)
            if cme == 'linebreak' or ( row.endswith(cme) and ( cme == cms and count_symbol(row,cms) == 2 ) or ( cme != cms and count_symbol(row,cms) == count_symbol(row,cme) == 1 ) ) :
                comment_type['openComment'] = False
                if get_detail : comment_type['detail'] = ['full']
            elif count_symbol(row,cms) == 1 and ( cme == cms or ( cme != cms and count_symbol(row,cme) == 0 ) ) :
                comment_type['openComment'] = True
                if get_detail : comment_type['detail'] = ['full','open']
            elif ( ( cme == cms and is_even(count_symbol(row,cms)) ) or ( cme != cms and count_symbol(row,cms) == count_symbol(row,cme) ) ) :
                comment_type['openComment'] = None
                if get_detail : comment_type['detail'] = ['multiple','close','startANDend' if row.endswith(cme) else 'startNOTend',str(int(count_symbol(row,cms)/(2 if cme == cms else 1)))]
            else :
                if cme != cms and count_symbol(row,cms) < count_symbol(row,cme) : update_log('technicalWarning','UNEXPECTED CASE : close > open ( %s )' % ','.join([str(count_symbol(row,cms)), str(count_symbol(row,cme))]))
                comment_type['openComment'] = True
                if get_detail : comment_type['detail'] = ['multiple','open','startANDend' if row.endswith(cme) else 'startNOTend',str(count_symbol(row,cms)),str(None if cme == cms else count_symbol(row,cme))]
        else :
            if cme == 'linebreak' or ( row.endswith(cme) and ( cme == cms and count_symbol(row,cms) == 2 ) or ( cme != cms and count_symbol(row,cms) == count_symbol(row,cme) == 1 ) ) :
                comment_type['openComment'] = False
                if get_detail : comment_type['detail'] = ['part']
            elif count_symbol(row,cms) == 1 and ( cme == cms or ( cme != cms and count_symbol(row,cme) == 0 ) ) :
                comment_type['openComment'] = True
                if get_detail : comment_type['detail'] = ['part','open']
            elif ( ( cme == cms and is_even(count_symbol(row,cms)) ) or ( cme != cms and count_symbol(row,cms) == count_symbol(row,cme) ) ) :
                comment_type['openComment'] = None
                if get_detail : comment_type['detail'] = ['multiple','close','NOTstartANDend' if row.endswith(cme) else 'NOTstartNOTend',str(int(count_symbol(row,cms)/(2 if cme == cms else 1)))]
            else :
                if cme != cms and count_symbol(row,cms) < count_symbol(row,cme) : update_log('technicalWarning','UNEXPECTED CASE : close > open ( %s )' % ','.join([str(count_symbol(row,cms)), str(count_symbol(row,cme))]))
                comment_type['openComment'] = True
                if get_detail : comment_type['detail'] = ['multiple','open','NOTstartANDend' if row.endswith(cme) else 'NOTstartNOTend',str(count_symbol(row,cms)),str(None if cme == cms else count_symbol(row,cme))]
    
    return comment_found, comment_type

def contain_enclosed(row,cur_intp):
    enclosed_found, enclosed_type = False, None
    dict_enclosers = get_syntax('enclosers',cur_intp)
    enclosers_count = { sym:[count_symbol(row,sym),count_symbol(row,v['close'])] for sym,v in dict_enclosers.items() if count_symbol(row,sym) + count_symbol(row,v['close']) != 0 }
    if len(enclosers_count) > 0 :
        enclosed_found, enclosed_type = True, {'openEncloser':len([1 for v in enclosers_count.values() if (v[0]-v[1])>0])>0,'enclosers_count':enclosers_count}
    
    return enclosed_found, enclosed_type

def map_row(row,cur_intp) :
    found_type, add_info = None, None
    if len(row) == 0 :
        found_type = 'blanckRow'
    else :
        if is_full_comment(row,cur_intp) :
            found_type = 'fullComment'
        else :
            rowContinuing = is_continuing(row,cur_intp)
            dict_syms = get_syntax('syms',cur_intp)
            syms_found = {sym:find_symbol(row,sym) for sym in dict_syms.keys() if count_symbol(row,sym) > 0}
            if len(syms_found) == 0 :
                if rowContinuing : 
                    found_type = 'continuingRow'
                else : 
                    found_type = 'standardRow'
            else :
                isolatedString,quotesDict = isolate_text(row,cur_intp)
                containComment,commentsDict = contain_comment(isolatedString,cur_intp)
                containEncloser,enclosersDict = contain_enclosed(isolatedString,cur_intp)
                if quotesDict['outQuote'] and ( not containComment or quotesDict['outQuote_pos'] < commentsDict['startComment_pos'] ) :
                    if not ( dict_syms[quotesDict['outQuote']]['allow_multiline'] or rowContinuing ) : 
                        update_log('inputDebug','WARNING case to check in map_row unmatched quote : ', row)
                    found_type = 'openQuote'
                    add_info = quotesDict['outQuote']
                elif containComment and commentsDict['openComment'] :
                    if not dict_syms[commentsDict['openComment']]['allow_multiline'] : update_log('inputDebug','WARNING case to check in map_row unmatched comment : ', row)
                    found_type = 'openComment'
                    add_info = commentsDict['openComment']
                elif containComment and commentsDict['openComment'] == False :
                    found_type = 'containComment'
                    add_info = commentsDict['startComment_pos']
                elif rowContinuing :
                    found_type = 'continuingRow'
                elif containEncloser and enclosersDict['openEncloser'] :
                    found_type = 'openEncloser'
                    add_info = enclosersDict['enclosers_count']
                elif isolatedString != row and containEncloser :
                    if containComment :
                        found_type = 'standardRow-withC&T&E'
                    else :
                        found_type = 'standardRow-withT&E'
                elif isolatedString != row :
                    if containComment :
                        found_type = 'standardRow-withC&T'
                    else :
                        found_type = 'standardRow-withT'
                elif containEncloser :
                    if containComment :
                        found_type = 'standardRow-withC&E'
                    else :
                        found_type = 'standardRow-withE'
                else :
                    update_log('technicalDebug','ERROR impossible case in map_row : ', row)
        
    return found_type, add_info

#- Mapping Rows

def isolate_contents(in_text,cur_intp,keepReplacement=False) :
    (residual_text, replacement_text) = isolate_text(in_text,cur_intp,True)
    replacement_pos = { k:get_pos_from_isolated(in_text,residual_text.find(k),cur_intp) for k in replacement_text }
    out_text, out_pos = '', []
    cur_len_ref,iter = 0,0
    found_parenth = [ p['open'] for p in get_syntax('enclosers',cur_intp,True).values() if p['open'] in residual_text and p['close'] in residual_text ]
    while len(found_parenth) > 0 :
        first_popen = min([ residual_text.find(p) for p in found_parenth ])
        cur_len_ref += first_popen
        for k,v in replacement_text.items() :
            if residual_text[:first_popen].find(k) >= 0 :
                out_pos.append([replacement_pos[k],len(v)])
                if k.find('stringQUOTE') == -1 :
                    update_log('technicalWarning','UNEXPECTED Quote initial',k,' in :',residual_text[:first_popen])
                    cur_len_ref += (len(v) - len(k))
                else :
                    residual_text = residual_text.replace(k,'stringQUOTE')
                    cur_len_ref += (len(v) - len(k))
                    first_popen -= (len(k) - len('stringQUOTE'))
        out_text += residual_text[:first_popen]
        residual_text = residual_text[first_popen:]
        ptype = [k for k,v in get_syntax('enclosers',cur_intp,True).items() if v['open'] == residual_text[0]][0]
        content = get_parentheses_content(residual_text, get_syntax('enclosers',cur_intp,True)[ptype]['open'], get_syntax('enclosers',cur_intp,True)[ptype]['close'])
        if content == None :
            content = ''
        txt_content = get_syntax('enclosers',cur_intp,True)[ptype]['open']+str(content)+get_syntax('enclosers',cur_intp,True)[ptype]['close']
        out_text += ptype+'PARENTH'
        len_content = len(txt_content)
        residual_text = residual_text[len_content:]
        for k,v in replacement_text.items() :
            if txt_content.find(k) >= 0 :
                if not 'stringQUOTE' in k :
                    update_log('technicalWarning','UNEXPECTED Quote enclosed',k,' in :',residual_text[:first_popen])
                len_content += (len(v) - len(k))
        out_pos.append([cur_len_ref,len_content])
        cur_len_ref += len_content
        found_parenth = [ p['open'] for p in get_syntax('enclosers',cur_intp,True).values() if p['open'] in residual_text and p['close'] in residual_text ]
    for k,v in replacement_text.items() :
        if residual_text.find(k) >= 0 :
            if k.find('stringQUOTE') == -1 :
                update_log('technicalWarning','UNEXPECTED Quote final',k,' in :',in_text)
            else :
                residual_text = residual_text.replace(k,'stringQUOTE')
            out_pos.append([replacement_pos[k],len(v)])
    out_text += residual_text
    return out_text,out_pos

def isolate_kwd(dict_rgx,in_txt,cur_intp) :
    for t in ['fwd','kwd','sym'] :
        if t == 'fwd' :
            keys = [k for k in get_syntax('firstwords',cur_intp)]
        elif t == 'kwd' :
            keys = [k for k in get_syntax('keywords',cur_intp)]
        elif t == 'sym' :
            keys = [k for k in get_syntax('delimiters',cur_intp)]
            keys.extend([k for k in get_syntax('operators',cur_intp)])
        cur_id = 0
        for cur_k in order_by_nbchar(keys,True) :
            i, found, start_i = 0, False, None
            while i < len(dict_rgx) :
                if start_i == None :
                    if t =='sym' :
                        cond = len(set(dict_rgx[i]['txt_rgx'])-set(['X','x','0','_'])) != 0
                    else :
                        cond = len(set(dict_rgx[i]['txt_rgx'])-set(['X','x','0','_'])) == 0
                    if cond and 'type' not in dict_rgx[i] :
                        if t =='sym' :
                            cur_split = cur_k
                        else :
                            cur_split = cur_k.split(' ')
                        if cur_split[0] == in_txt[dict_rgx[i]['start']:dict_rgx[i]['end']] :
                            if len(cur_split) == 1 :
                                dict_rgx[i]['type'] =  t
                                dict_rgx[i][t] =  t+str(cur_id)
                                cur_id += 1
                                found = True
                            else :
                                start_i = i
                else :
                    if t =='sym' :
                        cond = len(set(dict_rgx[i]['txt_rgx'])-set(['X','x','0','_'])) != 0
                    else :
                        cond = (len(set(dict_rgx[i]['txt_rgx'])-set(['X','x','0','_'])) == 0 or dict_rgx[i]['txt_rgx'] == ' ')
                    if cond and 'type' not in dict_rgx[i] :
                        cur_txt = ''.join([in_txt[dict_rgx[ii]['start']:dict_rgx[ii]['end']] for ii in range(start_i, i+1)])
                        if not cur_k.startswith(cur_txt) :
                            found, start_i = False, None
                        elif cur_k == cur_txt :
                            for ii in range(start_i, i+1) :
                                dict_rgx[ii]['type'] =  t
                                dict_rgx[ii][t] =  t+str(cur_id)
                            cur_id += 1
                            found = True
                    else :
                        found, start_i = False, None
                i+=1
    return dict_rgx

def isolate_rgx(code_txt,pos,cur_intp) :
    isolRgx,isolPos = isolate_contents(''.join([x['reduce_rgx'] for x in pos]), cur_intp, True)
    isolCorresp = get_corresp([len(x['reduce_rgx']) for x in pos],isolPos)
    base_pos, prev_id, cur_rgx = [], None, []
    i = 0
    while i < len(pos) :
        rgx_el = pos[i]
        if prev_id == None :
            if isolCorresp[i] != None :
                prev_id = isolCorresp[i]
                cur_rgx.append(i)
            elif 'type' in rgx_el :
                prev_id = rgx_el[rgx_el['type']]
                cur_rgx.append(i)
            elif pos[i]['reduce_rgx'] == ' ' :
                prev_id = 'blk'
                cur_rgx.append(i)
            else :
                base_pos.append([i,None])
            i += 1
        else :
            if isolCorresp[i-1] != None :
                if isolCorresp[i] == prev_id :
                    cur_rgx.append(i)
                    i += 1
                else :
                    base_pos.append([cur_rgx,isolate_contents(''.join([x['reduce_rgx'] for x in pos[cur_rgx[0]:i] ]), cur_intp)[0]])
                    prev_id, cur_rgx = None, []
            elif 'type' in pos[i-1] :
                if 'type' in rgx_el and rgx_el[rgx_el['type']] == prev_id :
                    cur_rgx.append(i)
                    i += 1
                else :
                    base_pos.append([cur_rgx,pos[i-1]['type']])
                    prev_id, cur_rgx = None, []
            elif prev_id == 'blk' :
                if pos[i]['reduce_rgx'] == ' ' :
                    cur_rgx.append(i)
                    i += 1
                else :
                    base_pos.append([cur_rgx,prev_id])
                    prev_id, cur_rgx = None, []
            else :
                update_log('technicalDebug','IMPOSSIBLE CASE')
                i+=1
    if prev_id != None :
        if isolCorresp[i-1] != None :
            base_pos.append([cur_rgx,isolate_contents(''.join([x['reduce_rgx'] for x in pos[cur_rgx[0]:i] ]), cur_intp)[0]])
        elif 'type' in pos[i-1] :
            base_pos.append([cur_rgx,pos[i-1]['type']])
        elif prev_id == 'blk' :
            base_pos.append([cur_rgx,prev_id])
        else :
            update_log('technicalDebug','IMPOSSIBLE CASE')
    isolRgx = ''.join([' ' if x[1] == 'blk' 
                       else pos[x[0]]['reduce_rgx'] if x[1] == None
                       else code_txt[pos[x[0][0]]['start']:pos[x[0][-1]]['end']] if x[1] in ['fwd','kwd','sym']
                       else x[1] for x in base_pos])
    return isolRgx, base_pos

def first_assignement(pos,base_pos,cur_intp) :
    assignsyms = [ csym for csym in [''.join([pos[ii]['txt_rgx'] for ii in x[0]]) for x in base_pos if x[1] == 'sym' ] 
                  if csym in get_assignement_delimiters(cur_intp) ]
    if len(assignsyms) > 0 :
        return assignsyms[0]
    else :
        return None

def full_expression(pos,base_pos,in_script,cur_intp) :
    baseRgx = ''.join([' ' if x[1] == 'blk' 
                       else pos[x[0]]['reduce_rgx'] if x[1] == None
                       else ''.join([in_script[pos[i]['start']:pos[i]['end']] for i in x[0]]) if x[1] in ['fwd','kwd','sym'] 
                       else x[1] for x in base_pos])
    for cur_k in order_by_nbchar(get_expressions_base(cur_intp).keys(),True) :
        if cur_k == baseRgx.strip() :
            return cur_k

def start_expression(pos,base_pos,in_script,cur_intp) :
    baseRgx = ''.join([' ' if x[1] == 'blk' 
                       else pos[x[0]]['reduce_rgx'] if x[1] == None
                       else ''.join([in_script[pos[i]['start']:pos[i]['end']] for i in x[0]]) if x[1] in ['fwd','kwd','sym'] 
                       else x[1] for x in base_pos])
    for cur_k in order_by_nbchar(get_expressions_base(cur_intp).keys(),True) :
        if baseRgx.strip().startswith(cur_k) :
            return cur_k


def is_end(in_type,cur_intp) :
    if in_type in [vv['class']+'-'+vv['elem'] for vv in get_expressions_base(cur_intp).values() if vv['class'] in ['value','identifier']] : return 'exvi'
    elif in_type in [vv['class']+'-'+vv['elem'] for vv in get_syntax('keywords',cur_intp).values() if vv['class'] == 'value'] : return 'kwdv'
    elif in_type in [vv['class']+'-'+vv['elem'] for vv in get_syntax('firstwords',cur_intp).values() if vv['alone'] != False] : return 'fwda'
    return False

def to_do():
    return ['EXCOMBO',
            'UNKNOWN',
            'unique-binary-shift-right',
            'unique-import-sub-external',
            'unique-separator-assignement',
            'unique-separator-linebreak',
            ]

def get_type(in_label,cur_intp) :
    if is_end(in_label,cur_intp) != False : return is_end(in_label,cur_intp)
    elif in_label in to_do() : return 'todo'
    elif in_label.endswith('PARENTH') : return 'empty'
    elif in_label.endswith('stringQUOTE') : return 'utxt'
    return 'unkw'

def iter_label(desc,level,out_dt,cur_intp,unknown={}) :
    if level == 0 : unknown={'0':[],'1':[],'2':[],'3':[]}
    level_max = max(len(x)-1 for x in desc)
    main_rgx = get_labeled_rgx(desc,level)
    if len(main_rgx[0]) == 1 :
        n_elem = len(desc)
        main_type = main_rgx[0][0]
        if main_type.endswith('PARENTH') or main_type.endswith('QUOTE') : level_type = main_type.split('-')[-1]
        else : level_type = main_type
        if level > level_max :
            update_log('technicalDebug','IMPOSSIBLE level larger max len : %d > %d' % (level, level_max))
        elif level == level_max :
            if level_type not in out_dt :
                out_dt[level_type] = {get_type(main_type,cur_intp):[str(n_elem)]}
                unknown['0'].append('->'.join([level_type,get_type(main_type,cur_intp),str(n_elem)]))
            elif get_type(main_type,cur_intp) not in out_dt[level_type] :
                out_dt[level_type][get_type(main_type,cur_intp)] = [str(n_elem)]
                unknown['1'].append('->'.join([level_type,get_type(main_type,cur_intp),str(n_elem)]))
            elif n_elem < min(int(x) for x in out_dt[level_type][get_type(main_type,cur_intp)]) or n_elem > max(int(x) for x in out_dt[level_type][get_type(main_type,cur_intp)]) :
                out_dt[level_type][get_type(main_type,cur_intp)].append(str(n_elem))
        elif level == level_max - 1 :
            sub_rgx = get_labeled_rgx(desc,level+1)
            sub_type =' '.join(sub_rgx[0])
            if main_type.endswith('PARENTH') : level_sub = sub_rgx[0][0]
            else : level_sub = sub_type
            if sub_type == main_type :
                if main_type.endswith('PARENTH') :
                    if level_type not in out_dt :
                        out_dt[level_type] = {level_sub:{'empty':[str(n_elem)]}}
                        unknown['0'].append('->'.join([level_type,level_sub,'empty',str(n_elem)]))
                    elif level_sub not in out_dt[level_type] :
                        out_dt[level_type][level_sub] = {'empty':[str(n_elem)]}
                        unknown['1'].append('->'.join([level_type,level_sub,'empty',str(n_elem)]))
                    elif 'empty' not in out_dt[level_type][level_sub] :
                        out_dt[level_type][level_sub]['empty'] = [str(n_elem)]
                        unknown['2'].append('->'.join([level_type,level_sub,'empty',str(n_elem)]))
                    elif n_elem < min(int(x) for x in out_dt[level_type][level_sub]['empty']) or n_elem > max(int(x) for x in out_dt[level_type][level_sub]['empty']) :
                        out_dt[level_type][level_sub]['empty'].append(str(n_elem))
                else :
                    update_log('technicalDebug','IMPOSSIBLE LAST sub type equal main for %s : %s' % (main_type, str(desc)))
            else :
                for lbl in [x for x in sub_rgx[0] if x != main_type] :
                    if is_numeric(lbl.split('-')[-1]) or lbl.split('-')[-1].endswith('PARENTH') :
                        update_log('technicalDebug','IMPOSSIBLE LAST label %s for sub %s under main %s %s' % (lbl,sub_type,main_type, str(sub_rgx)))
                    else :
                        if level_type not in out_dt :
                            out_dt[level_type] = {level_sub:{lbl:[get_type(lbl,cur_intp)]}}
                            unknown['0'].append('->'.join([level_type,level_sub,lbl,get_type(lbl,cur_intp)]))
                        elif level_sub not in out_dt[level_type] :
                            out_dt[level_type][level_sub] = {lbl:[get_type(lbl,cur_intp)]}
                            unknown['1'].append('->'.join([level_type,level_sub,lbl,get_type(lbl,cur_intp)]))
                        elif lbl not in out_dt[level_type][level_sub] :
                            out_dt[level_type][level_sub][lbl] = [get_type(lbl,cur_intp)]
                            unknown['2'].append('->'.join([level_type,level_sub,lbl,get_type(lbl,cur_intp)]))
                        elif get_type(lbl,cur_intp) not in out_dt[level_type][level_sub][lbl] :
                            out_dt[level_type][level_sub][lbl].append(get_type(lbl,cur_intp))
        else :
            sub_rgx = get_labeled_rgx(desc,level+1)
            sub_type =' '.join(sub_rgx[0])
            if main_type.endswith('PARENTH') : level_sub = sub_rgx[0][0]
            else : level_sub = sub_type
            if sub_type == main_type :
                update_log('technicalDebug','IMPOSSIBLE sub type equal main for %s : %s' % (main_type, str(desc)))
            else :
                for p,lbl in [(i,x) for i,x in enumerate(sub_rgx[0]) if x != main_type] :
                    if is_numeric(lbl.split('-')[-1]) or lbl.split('-')[-1].endswith('PARENTH') or main_type.endswith('PARENTH') :
                        sub_desc = [desc[x] for x in sub_rgx[1][p]]
                        unit_type = ' '.join([' '.join([str(l) for l in get_labeled_rgx(sub_desc,level+2)[0]])])
                        if main_type.endswith('PARENTH') :
                            if level_type not in out_dt :
                                out_dt[level_type] = {level_sub:{lbl:[unit_type]}}
                                unknown['0'].append('->'.join([level_type,level_sub,lbl,unit_type]))
                            elif level_sub not in out_dt[level_type] :
                                out_dt[level_type][level_sub] = {lbl:[unit_type]}
                                unknown['1'].append('->'.join([level_type,level_sub,lbl,unit_type]))
                            elif lbl not in out_dt[level_type][level_sub] :
                                out_dt[level_type][level_sub][lbl] = [unit_type]
                                unknown['2'].append('->'.join([level_type,level_sub,lbl,unit_type]))
                            elif unit_type not in out_dt[level_type][level_sub][lbl] :
                                out_dt[level_type][level_sub][lbl].append(unit_type)
                            iter_label(sub_desc,level+1,out_dt,cur_intp,unknown)
                        elif len(unit_type.split(' ')) == 1 :
                            if level_type not in out_dt :
                                out_dt[level_type] = {level_sub:{lbl:[unit_type]}}
                                unknown['0'].append('->'.join([level_type,level_sub,lbl,unit_type]))
                            elif level_sub not in out_dt[level_type] :
                                out_dt[level_type][level_sub] = {lbl:[unit_type]}
                                unknown['1'].append('->'.join([level_type,level_sub,lbl,unit_type]))
                            elif lbl not in out_dt[level_type][level_sub] :
                                out_dt[level_type][level_sub][lbl] = [unit_type]
                                unknown['2'].append('->'.join([level_type,level_sub,lbl,unit_type]))
                            elif unit_type not in out_dt[level_type][level_sub][lbl] :
                                out_dt[level_type][level_sub][lbl].append(unit_type)
                            iter_label(sub_desc,level+2,out_dt,cur_intp,unknown)
                        else :
                            update_log('technicalDebug','IMPOSSIBLE multi word unit :',main_type,str((main_rgx)),desc)
                    else :
                        update_log('technicalDebug','IMPOSSIBLE label %s for sub %s under main %s %s' % (lbl,sub_type,main_type, str(sub_rgx)))
    else :
        update_log('technicalDebug','IMPOSSIBLE multi word main :',main_type,str((main_rgx)),desc)
    if level == 0 :
        return unknown


def get_row_type(pos,base_pos,in_script,cur_intp,from_enclosed) :
    out = None
    if base_pos[0][1] == 'fwd' :
        cur_k = in_script[pos[base_pos[0][0][0]]['start']:pos[base_pos[0][0][-1]]['end']]
        out = get_syntax('firstwords',cur_intp)[cur_k]['class']+'-'+get_syntax('firstwords',cur_intp)[cur_k]['elem']
    elif len(base_pos) == 1 and base_pos[0][1] == 'kwd' :
        cur_k = in_script[pos[base_pos[0][0][0]]['start']:pos[base_pos[0][0][-1]]['end']]
        out = get_syntax('keywords',cur_intp)[cur_k]['class']+'-'+get_syntax('keywords',cur_intp)[cur_k]['elem']
    elif from_enclosed == False and first_assignement(pos,base_pos,cur_intp) != None :
        cur_k = first_assignement(pos,base_pos,cur_intp)
        out = get_syntax('delimiters',cur_intp)[cur_k]['class']+'-'+get_syntax('delimiters',cur_intp)[cur_k]['elem']
    elif full_expression(pos,base_pos,in_script,cur_intp) != None :
        cur_k = full_expression(pos,base_pos,in_script,cur_intp)
        out = get_expressions_base(cur_intp)[cur_k]['class']+'-'+get_expressions_base(cur_intp)[cur_k]['elem']
    elif len([x[1] for x in base_pos if x[1] in ['fwd','kwd','sym'] 
              and not ((in_script[pos[x[0][0]]['start']:pos[x[0][-1]]['end']] in get_syntax('delimiters',cur_intp)
                        and get_syntax('delimiters',cur_intp)[in_script[pos[x[0][0]]['start']:pos[x[0][-1]]['end']]]['class'] == 'expression')
                       or (in_script[pos[x[0][0]]['start']:pos[x[0][-1]]['end']] in get_syntax('keywords',cur_intp)
                           and get_syntax('keywords',cur_intp)[in_script[pos[x[0][0]]['start']:pos[x[0][-1]]['end']]]['class'] == 'value'))]) > 0 :
        out = None
        for k in [ ['for','firstwords','fwd','internal-'],['import','firstwords','fwd','internal-']
                  ,[',','delimiters','sym'],['if','firstwords','fwd','internal-'],['as','keywords','kwd']
                  ,['and','keywords','kwd'],['or','keywords','kwd'],['not','keywords','kwd']
                  ,['&','operators','sym'],['|','operators','sym'],['~','operators','sym']
                  ] :
            if k[0] in [in_script[pos[x[0][0]]['start']:pos[x[0][-1]]['end']] for x in base_pos if x[1] == k[2]] :
                cur_k = k[0]
                if len(k) == 4 :
                    out = k[3]+get_syntax(k[1],cur_intp)[cur_k]['class']+'-'+get_syntax(k[1],cur_intp)[cur_k]['elem']
                else :
                    out = get_syntax(k[1],cur_intp)[cur_k]['class']+'-'+get_syntax(k[1],cur_intp)[cur_k]['elem']
                break
        
        if out == None and from_enclosed == True and first_assignement(pos,base_pos,cur_intp) != None:
            cur_k = first_assignement(pos,base_pos,cur_intp)
            out = get_syntax('delimiters',cur_intp)[cur_k]['class']+'-'+get_syntax('delimiters',cur_intp)[cur_k]['elem']
        elif out == None :
            special = [[i,x[1]] for i,x in enumerate(base_pos) if x[1] in ['kwd','sym'] 
                    and ((in_script[pos[x[0][0]]['start']:pos[x[0][-1]]['end']] in get_syntax('keywords',cur_intp)
                          and get_syntax('keywords',cur_intp)[in_script[pos[x[0][0]]['start']:pos[x[0][-1]]['end']]]['class'] == 'comparison')
                          or (in_script[pos[x[0][0]]['start']:pos[x[0][-1]]['end']] in get_syntax('operators',cur_intp)
                              and get_syntax('operators',cur_intp)[in_script[pos[x[0][0]]['start']:pos[x[0][-1]]['end']]]['class'] == 'comparison'))]
            if len(special) > 0 :
                if len(set([x[1] for x in special])) > 1 : 
                    out = 'first-'
                else :
                    out = ''
                special = special[0]
                cur_k = in_script[pos[base_pos[special[0]][0][0]]['start']:pos[base_pos[special[0]][0][-1]]['end']]
                for k in [['kwd','keywords'],['sym','operators']] :
                    if special[1] == k[0] and cur_k in get_syntax(k[1],cur_intp) :
                        out += get_syntax(k[1],cur_intp)[cur_k]['class']+'-'+get_syntax(k[1],cur_intp)[cur_k]['elem']
                        break
            else :
                special = [[i,x[1]] for i,x in enumerate(base_pos) if x[1] in ['sym'] 
                        and in_script[pos[x[0][0]]['start']:pos[x[0][-1]]['end']] in get_syntax('operators',cur_intp)
                        and get_syntax('operators',cur_intp)[in_script[pos[x[0][0]]['start']:pos[x[0][-1]]['end']]]['class'] == 'operation']
                if len(special) > 0 :
                    if len(set([x[1] for x in special])) > 1 : 
                        out = 'first-'
                    else :
                        out = ''
                    special = special[0]
                    cur_k = in_script[pos[base_pos[special[0]][0][0]]['start']:pos[base_pos[special[0]][0][-1]]['end']]
                    for k in [['sym','operators']] :
                        if special[1] == k[0] and cur_k in get_syntax(k[1],cur_intp) :
                            out += get_syntax(k[1],cur_intp)[cur_k]['class']+'-'+get_syntax(k[1],cur_intp)[cur_k]['elem']
                            break
                else :
                    special = [[i,x[1]] for i,x in enumerate(base_pos) if x[1] in ['fwd','kwd','sym'] 
                            and not ((in_script[pos[x[0][0]]['start']:pos[x[0][-1]]['end']] in get_syntax('delimiters',cur_intp)
                                    and get_syntax('delimiters',cur_intp)[in_script[pos[x[0][0]]['start']:pos[x[0][-1]]['end']]]['class'] == 'expression')
                                    or (in_script[pos[x[0][0]]['start']:pos[x[0][-1]]['end']] in get_syntax('keywords',cur_intp)
                                        and get_syntax('keywords',cur_intp)[in_script[pos[x[0][0]]['start']:pos[x[0][-1]]['end']]]['class'] == 'value'))]
                    if len(special) == 1 :
                        special = special[0]
                        cur_k = in_script[pos[base_pos[special[0]][0][0]]['start']:pos[base_pos[special[0]][0][-1]]['end']]
                        out = 'unique-'
                        for k in [['fwd','firstwords'],['kwd','keywords'],['sym','delimiters'],['sym','operators']] :
                            if special[1] == k[0] and cur_k in get_syntax(k[1],cur_intp) :
                                out += get_syntax(k[1],cur_intp)[cur_k]['class']+'-'+get_syntax(k[1],cur_intp)[cur_k]['elem']
                                break
    elif len([1 for x in base_pos if x[1]=='blk']) == 0 and start_expression(pos,base_pos,in_script,cur_intp) != None :
        out = 'EXCOMBO'
    else :
        out = 'UNKNOWN'
    return out

def label_rgx(isolRgx,pos,base_pos,code_txt,origin,known_regex,known_exprs,cur_intp) :
    row_type = get_row_type(pos,base_pos,code_txt,cur_intp,str(origin).endswith('PARENTH'))
    if str(row_type).startswith('unique-') or str(row_type) in ['EXCOMBO','UNKNOWN'] :
        known_exprs[isolRgx] = [[row_type,[origin]]]
    elif str(row_type) in [v['class']+'-'+v['elem'] for v in get_expressions_base(cur_intp).values()] :
        known_exprs[isolRgx] = [[row_type,[origin]]]
    elif str(row_type).startswith('internal-') :
        internal_type = '-'.join(row_type.split('-')[1:])
        if internal_type not in [v['class']+'-'+v['elem'] for k,v in get_syntax('firstwords',cur_intp).items() if v["alone"] != True] :
            update_log('technicalDebug','IMPOSSIBLE internal- not fwda :',row_type)
        else :
            if internal_type not in [v['class']+'-'+v['elem'] for k,v in get_syntax('firstwords',cur_intp).items() if k in ['import','for','if']] :
                update_log('technicalWarning','UNEXPECTED internal- fwda :',row_type)
            cur_fwds = [k for k,v in get_syntax('firstwords',cur_intp).items() if 'class' in v and v['class']+'-'+v['elem'] == internal_type]
            for i,x in enumerate(base_pos) :
                if x[1] == 'fwd' and ''.join([code_txt[pos[ii]['start']:pos[ii]['end']] for ii in x[0]]) in cur_fwds :
                    cur_fwd = ''.join([code_txt[pos[ii]['start']:pos[ii]['end']] for ii in x[0]])
                    first_delim = i
                    break
            mid_delim = None
            if cur_fwd == 'for' :
                for i,x in enumerate(base_pos) :
                    if x[1] == 'kwd' and ''.join([code_txt[pos[ii]['start']:pos[ii]['end']] for ii in x[0]]) == 'in' :
                        mid_delim = i
                        break
            elif cur_fwd == 'if' :
                for i,x in enumerate(base_pos) :
                    if x[1] == 'fwd' and ''.join([code_txt[pos[ii]['start']:pos[ii]['end']] for ii in x[0]]) == 'else' :
                        mid_delim = i
                        break
            last_delim = len(base_pos)
            if mid_delim == None :
                known_exprs[isolRgx] = [[row_type,[origin]], [i for i in range(first_delim)], [i for i in range(first_delim+1,last_delim)]]
            else :
                known_exprs[isolRgx] = [[row_type,[origin]], [i for i in range(first_delim)], [i for i in range(first_delim+1,mid_delim)], [i for i in range(mid_delim+1,last_delim)]]
    elif str(row_type) in [v['class']+'-'+v['elem'] for v in get_syntax('firstwords',cur_intp).values() if v["alone"] != True] :
        cur_fwds = [k for k,v in get_syntax('firstwords',cur_intp).items() if 'class' in v and v['class']+'-'+v['elem'] == row_type]
        for i,x in enumerate(base_pos) :
            if x[1] == 'fwd' and ''.join([code_txt[pos[ii]['start']:pos[ii]['end']] for ii in x[0]]) in cur_fwds :
                cur_fwd = ''.join([code_txt[pos[ii]['start']:pos[ii]['end']] for ii in x[0]])
                first_delim = i
                break
        mid_delim = None
        if cur_fwd == 'for' :
            for i,x in enumerate(base_pos) :
                if x[1] == 'kwd' and ''.join([code_txt[pos[ii]['start']:pos[ii]['end']] for ii in x[0]]) == 'in' :
                    mid_delim = i
                    break
        if get_syntax('firstwords',cur_intp)[cur_fwd]['end'] in get_syntax('linebreaks',cur_intp).keys() :
            last_delim = len(base_pos)
        else :
            last_delim = len(base_pos)
            for i in reversed(range(len(base_pos))) :
                x = base_pos[i]
                if x[1] == 'sym' and ''.join([code_txt[pos[ii]['start']:pos[ii]['end']] for ii in x[0]]) == get_syntax('firstwords',cur_intp)[cur_fwd]['end'] :
                    last_delim = i
                    break
            if last_delim == len(base_pos) :
                update_log('technicalWarning','UNEXPECTED END not found in fwd',code_txt)
        if mid_delim == None :
            known_exprs[isolRgx] = [[row_type,[origin]], [i for i in range(first_delim+1,last_delim)]]
        else :
            known_exprs[isolRgx] = [[row_type,[origin]], [i for i in range(first_delim+1,mid_delim)], [i for i in range(mid_delim+1,last_delim)]]
        if last_delim < len(base_pos)-1 :
            known_exprs[isolRgx].append([i for i in range(last_delim+1,len(base_pos))])
    elif str(row_type) in [v['class']+'-'+v['elem'] for v in get_syntax('firstwords',cur_intp).values() if v["alone"] == True] :
        cur_fwds = [k for k,v in get_syntax('firstwords',cur_intp).items() if 'class' in v and v['class']+'-'+v['elem'] == row_type]
        for i,x in enumerate(base_pos) :
            if x[1] == 'fwd' and ''.join([code_txt[pos[ii]['start']:pos[ii]['end']] for ii in x[0]]) in cur_fwds :
                cur_fwd = ''.join([code_txt[pos[ii]['start']:pos[ii]['end']] for ii in x[0]])
                first_delim = i
                break
        mid_delim = None
        if get_syntax('firstwords',cur_intp)[cur_fwd]['end'] in get_syntax('linebreaks',cur_intp).keys() :
            last_delim = len(base_pos)
        else :
            last_delim = len(base_pos)
            for i in reversed(range(len(base_pos))) :
                x = base_pos[i]
                if x[1] == 'sym' and ''.join([code_txt[pos[ii]['start']:pos[ii]['end']] for ii in x[0]]) == get_syntax('firstwords',cur_intp)[cur_fwd]['end'] :
                    last_delim = i
                    break
            if last_delim == len(base_pos) :
                update_log('technicalWarning','UNEXPECTED END not found in fwda',code_txt)
        if mid_delim == None :
            known_exprs[isolRgx] = [[row_type,[origin]]]
        else :
            known_exprs[isolRgx] = [[row_type,[origin]], [i for i in range(mid_delim+1,last_delim)]]
        if last_delim < len(base_pos)-1 :
            known_exprs[isolRgx].append([i for i in range(last_delim+1,len(base_pos))])
    else :
        cur_delims = []
        for type_key in [['delimiters','sym'],['operators','sym'],['keywords','kwd'],['firstwords','fwd']] :
            if str(row_type) in set([v['class']+'-'+v['elem'] for v in get_syntax(type_key[0],cur_intp).values()]) :
                cur_delims = [k for k,v in get_syntax(type_key[0],cur_intp).items() if v['class']+'-'+v['elem'] == str(row_type)]
                break
        if len(cur_delims) == 1 :
            split = get_syntax(type_key[0],cur_intp)[cur_delims[0]]['split'] if 'split' in get_syntax(type_key[0],cur_intp)[cur_delims[0]] else None
            split_delims = [i for i,x in enumerate(base_pos) if x[1] == type_key[1] and ''.join([code_txt[pos[ii]['start']:pos[ii]['end']] for ii in x[0]]) == cur_delims[0]]
            known_exprs[isolRgx] = [[row_type,[origin]]]
            if split in ['all','mid'] :
                known_exprs[isolRgx].extend([[i for i in range(split_delims[0])], [i for i in range(split_delims[0]+1,len(base_pos))]])
            elif split == 'from' :
                known_exprs[isolRgx].append([i for i in range(split_delims[0]+1,len(base_pos))])
        elif len(cur_delims) > 1 : 
            update_log('dictionnaryError','!!! ERROR IN DICTIONNARIES DEFINITION : ',len(cur_delims),'cases for',row_type)
            known_exprs[isolRgx] = [[row_type,[origin]]]
        else :
            update_log('technicalWarning','UNEXPECTED :\n',isolRgx,[[row_type,[origin]]])
            known_exprs[isolRgx] = [[row_type,[origin]]]

def iter_map_rgx(code_txt,origin,known_regex,known_exprs,known_syntax,cur_intp) :
    if code_txt != '' :
        pos = isolate_kwd(buildRegex(code_txt),code_txt,cur_intp)
        reduceRgx = ''.join([code_txt[x['start']:x['end']] if 'type' in x else x['reduce_rgx'] for x in pos])
        if reduceRgx not in known_regex :
            isolRgx, base_pos = isolate_rgx(code_txt,pos,cur_intp)
            if isolRgx.strip() == 'stringQUOTE' :
                out_pos = [[origin+'-'+isolRgx.strip()] for i in range(len(pos))]
            if isolRgx.strip() in [v['type']+'PARENTH' for v in get_syntax('enclosers',cur_intp).values()] :
                cur_enclosed = [x[0] for x in base_pos if x[1] != 'blk' and x[1].endswith('PARENTH')][0]
                elem = ''.join([code_txt[pos[i]['start']:pos[i]['end']] for i in cur_enclosed[1:-1]])
                elem_pos = iter_map_rgx(elem.strip(),origin+'-'+isolRgx.strip(),known_regex,known_exprs,known_syntax,cur_intp)
                out_pos = [[origin+'-'+isolRgx.strip()] for i in range(len(pos))]
                started,cur = False,0
                for p in cur_enclosed[1:-1] :
                    if code_txt[pos[p]['start']:pos[p]['end']] != ' ' : started = True
                    if started and cur < len(elem_pos) :
                        out_pos[p].extend(elem_pos[cur])
                        cur += 1
            else :
                if isolRgx not in known_exprs :
                    label_rgx(isolRgx,pos,base_pos,code_txt,origin,known_regex,known_exprs,cur_intp)
                elif origin not in known_exprs[isolRgx][0][1] :
                    known_exprs[isolRgx][0][1].append(origin)
                out_pos = [[known_exprs[isolRgx][0][0]] for i in range(len(pos))]
                for el_pos in range(1,len(known_exprs[isolRgx])) :
                    elem = ''.join([code_txt[pos[base_pos[i][0][0]]['start']:pos[base_pos[i][0][-1]]['end']] if type(base_pos[i][0]) is list 
                                    else code_txt[pos[base_pos[i][0]]['start']:pos[base_pos[i][0]]['end']] for i in known_exprs[isolRgx][el_pos]]) 
                    elem_pos = iter_map_rgx(elem.strip(),known_exprs[isolRgx][0][0]+'-'+str(el_pos),known_regex,known_exprs,known_syntax,cur_intp)
                    started,cur = False,0
                    for i in known_exprs[isolRgx][el_pos] :
                        x = base_pos[i] 
                        if x[1] != 'blk' : started = True
                        if started and cur < len(elem_pos) :
                            if type(x[0]) is list :
                                for ii,p in enumerate(x[0]) :
                                    out_pos[p].append(known_exprs[isolRgx][0][0]+'-'+str(el_pos))
                                    out_pos[p].extend(elem_pos[cur])
                                    cur+=1
                            else :
                                out_pos[x[0]].append(known_exprs[isolRgx][0][0]+'-'+str(el_pos))
                                out_pos[x[0]].extend(elem_pos[cur])
                                cur+=1
            if origin == 'code-row' :
                unknown = iter_label(out_pos,0,known_syntax,cur_intp)
                if max([len(v) for v in unknown.values()]) > 0 :
                    update_log('syntaxUpdate',code_txt)
                    update_log('syntaxUpdate',reduceRgx)
                    update_log('syntaxUpdate','MAIN TYPE :',' '.join(get_labeled_rgx(out_pos,0)[0]))
                    update_log('syntaxUpdate',' '.join(get_labeled_rgx(out_pos,'max')[0]))
                    if 'syntaxUpdate' in to_print_alert() : iter_print_dict(unknown)
                    update_log('syntaxUpdate','---------------------------\n')
                known_regex[reduceRgx] = out_pos
        else :
            out_pos = known_regex[reduceRgx]
        
        if origin != 'code-row' : 
            return out_pos
        
        return [reduceRgx,pos]
    elif origin == 'code-row' :
        return 'blank'

def get_labeled_rgx(desc,level='max') :
    labeled_rgx, prev_label = [[],[]], ''
    if level == 'max' : level = max([len(x) for x in desc])
    for i,cur_labels in enumerate(desc) :
        cur_label = cur_labels[min(level,len(cur_labels)-1)]
        if cur_label != prev_label :
            if str(cur_label) not in labeled_rgx :
                labeled_rgx[0].append(str(cur_label))
                labeled_rgx[1].append([])
            prev_label = cur_label
        labeled_rgx[1][-1].append(i)
    return labeled_rgx

#- Mapping Blocks

# ATTENTION : call in Build Dictionnary ONLY at the moment -> to move in finalizing Mapping Blocks
def get_block_info(case_list,mappingResult,elementsMap) :
    out_dict, cur_open = {}, []
    for row in [k for k,v in mappingResult.items() if len(v) == 5] :
        if cur_open == [] :
            pass
        elif mappingResult[row][3].startswith(cur_open[-1]+'.') :
            out_dict[row] = cur_open[-1]
        elif not mappingResult[row][3].startswith(cur_open[0]+'.') :
            cur_open = []
        else :
            for i,blk in enumerate(cur_open) :
                if not mappingResult[row][3].startswith(blk+'.') :
                    break
            if i > 0 :
                cur_open = cur_open[:i]
                out_dict[row] = cur_open[-1]
            else :
                update_log('technicalDebug','IMPOSSIBLE in get block info')
        if ' '.join(get_labeled_rgx(elementsMap[row],level=0)[0]) in case_list :
            cur_open.append(mappingResult[row][3])
    return out_dict

#- Mapping Elements

def as_output(row_type) :
    return row_type.startswith('import') or row_type == 'assignement-from' or ( row_type.startswith('assignement') and not row_type.startswith('assignement-from') )

def is_accepted_output(in_lbl) :
    return in_lbl in ['separator-element','assignement-name','assignement-annotation','object-function'] or in_lbl.startswith('internal-') or in_lbl.endswith('PARENTH')

def get_unit_desc(lbl_rgx,lbl_row_pos,script,pos,cur_intp) :
    if len(lbl_rgx[0]) > 1 :
        update_log('technicalDebug','IMPOSSIBLE multiple unit :',lbl_rgx)
    elif [x+min(lbl_row_pos) for x in lbl_rgx[1][0]] != lbl_row_pos :
        update_log('technicalDebug','IMPOSSIBLE unit position :',[x+min(lbl_row_pos) for x in lbl_rgx[1][0]], 'different of', lbl_row_pos)
    elif len(lbl_row_pos) == 1 :
        return [''.join([script[pos[x]['start']:pos[x]['end']] for x in lbl_row_pos])] , ' '.join(lbl_rgx[0]), False, [lbl_row_pos]
    else :
        elem_type = ' '.join(lbl_rgx[0])
        exp_split = [v['split'] for v in get_expressions_base(cur_intp).values() if 'split' in v and 'class' in v and v['class']+'-'+v['elem'] == elem_type]
        if len(exp_split) > 1 :
            update_log('dictionnaryError','!!! ERROR IN DICTIONNARIES DEFINITION : ',len(exp_split),'cases for',elem_type)
        else :
            if len(exp_split) == 0 :
                if elem_type not in to_do() : update_log('technicalDebug','IMPOSSIBLE no split already treated :',lbl_rgx)
            elif exp_split[0] == 'unit' :
                elms = [ script[pos[lbl_row_pos[0]]['start']:pos[lbl_row_pos[0]]['end']],
                         script[pos[lbl_row_pos[1]]['start']:pos[lbl_row_pos[-1]]['end']] ]
                if ' ' in elms :
                    update_log('technicalDebug','IMPOSSIBLE split unit element :',elem_type,lbl_row_pos,'\n',script[pos[lbl_row_pos[0]]['start']:pos[lbl_row_pos[-1]]['end']])
                else :
                    if pos[lbl_row_pos[0]]['reduce_rgx'] != 'x' :
                        update_log('technicalDebug','IMPOSSIBLE not first x in unit element :',elem_type,lbl_row_pos,'\n',script[pos[lbl_row_pos[0]]['start']:pos[lbl_row_pos[-1]]['end']])
                    else :
                        return elms , elem_type, ''.join([pos[x]['reduce_rgx'] for x in lbl_row_pos[1:]]) != 'x', [lbl_row_pos[0:1],lbl_row_pos[1:]]
            elif exp_split[0] == 'fsym' :
                if script[pos[lbl_row_pos[0]]['start']:pos[lbl_row_pos[0]]['end']] not in [ k for k,v in get_syntax('delimiters',cur_intp).items() if v["class"]=="expression" ] :
                    update_log('technicalDebug','IMPOSSIBLE split fsym element :',elem_type,script)
                else :
                    elms = [ script[pos[lbl_row_pos[1]]['start']:pos[lbl_row_pos[-1]]['end']] ]
                    if ''.join([pos[x]['reduce_rgx'] for x in lbl_row_pos[1:]]) != 'x' :
                        update_log('technicalDebug','IMPOSSIBLE not first x in unit element :',elem_type,lbl_row_pos,'\n',script[pos[lbl_row_pos[0]]['start']:pos[lbl_row_pos[-1]]['end']])
                    else :
                        return elms , elem_type, False, [lbl_row_pos[1:]]
            elif exp_split[0] == '.' :
                if script[pos[lbl_row_pos[1]]['start']:pos[lbl_row_pos[1]]['end']] != exp_split[0] :
                    update_log('technicalDebug','IMPOSSIBLE split . element :',elem_type,script[pos[lbl_row_pos[0]]['start']:pos[lbl_row_pos[-1]]['end']])
                else :
                    elms = [ script[pos[lbl_row_pos[0]]['start']:pos[lbl_row_pos[0]]['end']],
                             script[pos[lbl_row_pos[2]]['start']:pos[lbl_row_pos[-1]]['end']] ]
                    if pos[lbl_row_pos[0]]['reduce_rgx'] != 'x' :
                        update_log('technicalDebug','IMPOSSIBLE not first x in unit element :',elem_type,lbl_row_pos,'\n',script[pos[lbl_row_pos[0]]['start']:pos[lbl_row_pos[-1]]['end']])
                    else :
                        return elms , elem_type, ''.join([pos[x]['reduce_rgx'] for x in lbl_row_pos[2:]]) != 'x', [lbl_row_pos[0:1],lbl_row_pos[2:]]
            else :
                if elem_type not in to_do() : update_log('technicalDebug','IMPOSSIBLE expression split :',exp_split,elem_type)
    return None, None, None, None

def iter_get_unit_desc(row,lbl_pos,pos,main_pos_list,row_script,out_elems,known_exprs, known_regex, known_syntax,cur_intp) :
    row_type = ' '.join(get_labeled_rgx(lbl_pos,level=0)[0])
    row_lbl = get_labeled_rgx(lbl_pos,level='max')
    if row != 'sub' :
        out_elems[row] = {}
        list_elem = [(i,x) for i,x in enumerate(row_lbl[0])]
    else :
        out_elems['sub'] = {'pos':lbl_pos}
        if row_type == ' '.join(row_lbl[0]) : list_elem = [(i,x) for i,x in enumerate(row_lbl[0])]
        else : list_elem = [(i,x) for i,x in enumerate(row_lbl[0]) if x != row_type]
    for p,el in list_elem :
        if el in [v['class']+'-'+v['elem'] for v in get_expressions_base(cur_intp).values() if 'split' in v] :
            if row != 'sub' :
                pos_list = row_lbl[1][p]
                elem_pos = [ lbl_pos[x] for x in pos_list ]
            else :
                pos_list = [ main_pos_list[x] for x in row_lbl[1][p] ]
                elem_pos = [ lbl_pos[x] for x in row_lbl[1][p] ]
            elem_name,elem_type,to_iter,elem_pos_list = get_unit_desc(get_labeled_rgx(elem_pos,level='max'),pos_list,row_script,pos,cur_intp)
            if elem_name != None :
                out_elems[row][p] = {}
                for n,x in enumerate(elem_name) :
                    out_elems[row][p][elem_type+'-'+str(n+1)] = {'name':x,'pos_list':elem_pos_list[n]}
                if to_iter :
                    sub_pos = iter_map_rgx(elem_name[1],elem_type,known_regex,known_exprs,known_syntax,cur_intp)
                    if sub_pos != None :
                        iter_get_unit_desc('sub',sub_pos,pos,elem_pos_list[1],row_script,out_elems[row][p][elem_type+'-'+str(n+1)],known_exprs, known_regex, known_syntax,cur_intp)
                    elif row != 'sub' :
                        update_log('technicalDebug','IMPOSSIBLE first no sub_pos :',row)
            else :
                update_log('technicalWarning','UNEXPECTED [row %s] no name found for ' % str(row),el,'at pos',p)

def get_elems(sub_dict,p,exp_pos) :
    for k,v in sub_dict.items() :
        if k != 'pos' :
            for kk,vv in v.items() :
                if p in vv['pos_list'] :
                    i = [i for i,x in enumerate(vv['pos_list']) if x == p][0]
                    if 'sub' not in vv :
                        exp_pos.append(kk)
                        return {'pos':exp_pos,'name':vv['name']}
                    elif 'pos' in vv['sub'] and len(vv['sub']) == 1  :
                        exp_pos.extend(vv['sub']['pos'][i])
                        return {'pos':exp_pos}
                    elif 'pos' in vv['sub'] :
                        exp_pos.extend(vv['sub']['pos'][i])
                        return get_elems(vv['sub'],p,exp_pos)
                    else :
                        update_log('technicalDebug','IMPOSSIBLE ITER pos not saved for ',sub_dict,p)
                    break
    return {'pos':exp_pos}

def get_group_elems(rows, cleanedScript, known_exprs, known_regex, known_syntax,cur_intp) :
    out_elems = {}
    for row,pos,lbl_pos in rows :
        row_elems = {}
        iter_get_unit_desc(row,lbl_pos,pos,None,cleanedScript[row].lstrip(),row_elems,known_exprs, known_regex, known_syntax,cur_intp)
        tmp_out = {}
        for k,v in row_elems[row].items() :
            for kk,vv in v.items() :
                if 'sub' not in vv :
                    for p in vv['pos_list'] :
                        tmp_out[p] = {'pos':[kk],'name':vv['name']}
                elif 'pos' in vv['sub'] and len(vv['sub']) == 1 :
                    for i,p in enumerate(vv['pos_list']) :
                        tmp_out[p] = {'pos':vv['sub']['pos'][i]}
                elif 'pos' in vv['sub'] :
                    for i,p in enumerate(vv['pos_list']) :
                        tmp_out[p] = get_elems(vv['sub'],p,[x for x in vv['sub']['pos'][i]])
                else :
                    update_log('technicalDebug','IMPOSSIBLE pos not saved for row :',row,k,kk,vv)
        if tmp_out != {} :
            out_elems[row] = tmp_out
    return out_elems

#- Build Dictionnary

def get_sub_level_lbl(elementsMap_row,ref_level_lbl,sub_level):
    sub_level_lbl = get_labeled_rgx([elementsMap_row[x] for x in ref_level_lbl],level=sub_level)
    sub_level_lbl[1] = [[nx+min(ref_level_lbl) for nx in x] for x in sub_level_lbl[1]]
    return sub_level_lbl

def update_counter(counter,internal_counter) :
    if internal_counter[1] > 0 :
        if internal_counter[0] == internal_counter[1] :
            counter[1] += 1
        else :
            counter[2] += 1

# missing = []
def get_row_class(row_type,refSyntax):
    main_type = None
    for key,val in refSyntax.items() :
        if row_type in val :
            main_type = key
            break
    return main_type

def get_row_cur_type(cur_origin,cur_dict) :
    if cur_origin == "code-row" and cur_dict["row"][0] == True : cur_type = 'main_row'
    elif cur_origin == "row" and cur_dict["row"][0] == True and cur_dict["row"][1] == True : cur_type = 'sub_row'
    elif cur_origin not in ["code-row","row"] and (cur_dict["row"][0] == False or cur_dict["row"][1] == True) : cur_type = 'element'
    else : cur_type = None
    return cur_type

def register_out_elem(elem_desc,out_elems,row,blk,blocksLocal) :
    if elem_desc['lbl_type'] == "" or elem_desc['lbl_type'].startswith('value-') :
        elem_id = 'value'
    else :
        cur_global = elem_desc['lbl'] == "global variable" or row not in blocksLocal
        found_eid = [k for k,v in out_elems.items() if v['name'] == elem_desc['name'] 
                    and v['type'] == elem_desc['lbl'] 
                    and ( cur_global == True or v['global'] == True or ( cur_global == v['global'] == False and blocksLocal[row] in v['blocks'] ) ) ]
        if len(found_eid) == 0 :
            elem_id = len(out_elems.keys())
            out_elems[elem_id] = {
                                'rows': [row],
                                'name': elem_desc['name'],
                                'type': elem_desc['lbl'],
                                'global': cur_global,
                                'used': False,
                                'modified': False,
                                'initial': str(row) if elem_desc['type'] == "output" else "NA",
                                'reinitials': [],
                                'blocks': [blk],
                                'later_global':None
                                }
        elif len(found_eid) == 1 :
            elem_id = found_eid[0]
            cur_out = out_elems[elem_id]
            cur_out['global'] = cur_global == True or cur_out['global'] == True
            if row not in cur_out['rows'] :
                cur_out['rows'].append(row)
            if blk not in cur_out['blocks'] :
                cur_out['blocks'].append(blk)
            if elem_desc['type'] == "output" and cur_out['initial'] == "NA" :
                cur_out['initial'] = str(row)
            elif elem_desc['type'] == "output" :
                cur_out['reinitials'].append(row)
                cur_out['modified'] = True
            else :
                cur_out['used'] = True
        else :
            sub_eid = [k for k in found_eid if out_elems[k]['global'] == True]
            if len(sub_eid) == 0 and cur_global == True :
                elem_id = len(out_elems.keys())
                out_elems[elem_id] = {
                                    'rows': [row],
                                    'name': elem_desc['name'],
                                    'type': elem_desc['lbl'],
                                    'global': cur_global,
                                    'used': False,
                                    'modified': False,
                                    'initial': str(row) if elem_desc['type'] == "output" else "NA",
                                    'reinitials': [],
                                    'blocks': [blk],
                                    'later_global':None
                                    }
                for ceid in found_eid :
                    out_elems[ceid]['later_global'] = elem_id
            elif len(sub_eid) == 1 :
                elem_id = sub_eid[0]
                cur_out = out_elems[elem_id]
                if row not in cur_out['rows'] :
                    cur_out['rows'].append(row)
                if blk not in cur_out['blocks'] :
                    cur_out['blocks'].append(blk)
                if elem_desc['type'] == "output" and cur_out['initial'] == "NA" :
                    cur_out['initial'] = str(row)
                elif elem_desc['type'] == "output" :
                    cur_out['reinitials'].append(row)
                    cur_out['modified'] = True
                else :
                    cur_out['used'] = True
            else :
                update_log('technicalDebug','IMPOSSIBLE ELEMENT CASE')
        
    elem_desc["eid"] = elem_id

def add_element_name(d_elem,cleanedScript_row,mappingResult_rowDesc) :
    d_elem['name'] = cleanedScript_row.lstrip()[mappingResult_rowDesc[d_elem['pos'][0]]['start']:mappingResult_rowDesc[d_elem['pos'][-1]]['end']]

def iter_identify_elements(main_level_lbl,refSyntax,internal_counter
                           ,elementsMap_row,cleanedScript_row,mappingResult_rowDesc,row,blocksLocal,blk,internal_out,out_elems
                           ,cur_level=1,origin="code-row",herited=[None,None],retained=None) :
    row_type = ' '.join(main_level_lbl[0])
    main_type = get_row_class(row_type,refSyntax)
    out_pseudo = []
    if main_type != None :
        level_lbl = get_sub_level_lbl(elementsMap_row,main_level_lbl[1][0],cur_level)
        if ' '.join(level_lbl[0]) in refSyntax[main_type][row_type].keys() :
            cur_dict = refSyntax[main_type][row_type][' '.join(level_lbl[0])]
            cur_type = get_row_cur_type(origin,cur_dict)
            if cur_type != None :
                cur_pseudo = {}
                for pos,lbl in enumerate(level_lbl[0]) :
                    if lbl != row_type :
                        internal_counter[0] += 1
                        if lbl in cur_dict["elements"].keys() :
                            if "iter_step" in cur_dict["elements"][lbl] : 
                                iter_step = cur_dict["elements"][lbl]["iter_step"]
                            else :
                                update_log('technicalDebug',"IMPOSSIBLE 5", row)
                            cur_origin = cur_dict["elements"][lbl]["type"]
                            if cur_origin == "row" :
                                cur_herited = [None,None]
                            else :
                                cur_herited = []
                                if cur_origin in ["iter","heritage"] :
                                    cur_herited.append(herited[0])
                                else :
                                    cur_herited.append(cur_origin)
                                if "lbl" in cur_dict["elements"][lbl] and cur_dict["elements"][lbl]["lbl"] == "heritage" : 
                                    cur_herited.append(herited[1])
                                if "lbl" in cur_dict["elements"][lbl] : 
                                    cur_herited.append(cur_dict["elements"][lbl]["lbl"])
                                else :
                                    cur_herited.append(None)
                            
                            if "accepted" not in cur_dict["elements"][lbl].keys() :
                                if cur_origin in ['iter','row'] :
                                    sub_level_lbl = get_sub_level_lbl(elementsMap_row,level_lbl[1][pos],cur_level)
                                    cur_pseudo[lbl] = iter_identify_elements(sub_level_lbl,refSyntax,internal_counter
                                                                             ,elementsMap_row,cleanedScript_row,mappingResult_rowDesc,row,blocksLocal,blk,internal_out,out_elems
                                                                             ,cur_level+iter_step,cur_origin,cur_herited,retained)
                                elif cur_origin in ['output','input','external','heritage'] :
                                    internal_out.append({
                                        'type':cur_herited[0],
                                        'lbl':cur_herited[1],
                                        'lbl_type':lbl,
                                        'pos':level_lbl[1][pos],
                                        'origin':retained
                                        })
                                    add_element_name(internal_out[-1],cleanedScript_row,mappingResult_rowDesc)
                                    register_out_elem(internal_out[-1],out_elems,row,blk,blocksLocal)
                                    cur_pseudo[lbl] = [{'text':cur_herited[1],"unit":internal_counter[0]},
                                                       {'text':internal_out[-1]['name'],"unit":internal_counter[0],'eid':internal_out[-1]['eid']}]
                                else :
                                    update_log('technicalDebug',"IMPOSSIBLE 3",cur_origin, row)
                            else :
                                sub_level_lbl = get_sub_level_lbl(elementsMap_row,level_lbl[1][pos],cur_level+1)
                                if lbl.endswith('PARENTH') :
                                    if sub_level_lbl[0][0] == sub_level_lbl[0][-1] == lbl :
                                        sub_level_lbl = [sub_level_lbl[0][1:-1],sub_level_lbl[1][1:-1]]
                                    else :
                                        update_log('technicalDebug',"IMPOSSIBLE 4", row)
                                if ' '.join(sub_level_lbl[0]) in cur_dict["elements"][lbl]["accepted"] :
                                    el_dict = cur_dict["elements"][lbl]["accepted"][' '.join(sub_level_lbl[0])]
                                    if el_dict['specific'] == "iter" :
                                        if "retain" in el_dict :
                                            cur_retained = lbl
                                        else :
                                            cur_retained = retained
                                        cur_pseudo[lbl] = iter_identify_elements(sub_level_lbl,refSyntax,internal_counter
                                                                                 ,elementsMap_row,cleanedScript_row,mappingResult_rowDesc,row,blocksLocal,blk,internal_out,out_elems
                                                                                 ,cur_level+iter_step,"iter",cur_herited,cur_retained)
                                    elif el_dict['specific'] == False :
                                        internal_out.append({
                                            'type':cur_herited[0],
                                            'lbl':cur_herited[1],
                                            'lbl_type':' '.join(sub_level_lbl[0]),
                                            'pos':level_lbl[1][pos],
                                            'origin':retained
                                            })
                                        add_element_name(internal_out[-1],cleanedScript_row,mappingResult_rowDesc)
                                        register_out_elem(internal_out[-1],out_elems,row,blk,blocksLocal)
                                        cur_pseudo[lbl] = [{'text':cur_herited[1],"unit":internal_counter[0]},
                                                           {'text':internal_out[-1]['name'],"unit":internal_counter[0],'eid':internal_out[-1]['eid']}]
                                    else :
                                        internal_out.append({
                                            'type':cur_herited[0],
                                            'lbl':el_dict['specific'],
                                            'lbl_type':' '.join(sub_level_lbl[0]),
                                            'pos':level_lbl[1][pos],
                                            'origin':retained
                                            })
                                        add_element_name(internal_out[-1],cleanedScript_row,mappingResult_rowDesc)
                                        register_out_elem(internal_out[-1],out_elems,row,blk,blocksLocal)
                                        cur_pseudo[lbl] = [{'text':el_dict['specific'],"unit":internal_counter[0]},
                                                           {'text':internal_out[-1]['name'],"unit":internal_counter[0],'eid':internal_out[-1]['eid']}]
                                else :
                                    cur_pseudo[lbl] = [{'text':"ERROR "+' '.join(sub_level_lbl[0]),"unit":internal_counter[0]}]
                                    internal_counter[1] += 1
                                    # if ' '.join(sub_level_lbl[0]) not in ["EXCOMBO","UNKNOWN","None",None] and not ' '.join(sub_level_lbl[0]).startswith("unique-") :
                                    #     if ' '.join([' '.join(level_lbl[0]),':',lbl,'dont accept',' '.join(sub_level_lbl[0])]) not in missing :
                                    #         missing.append(' '.join([' '.join(level_lbl[0]),':',lbl,'dont accept',' '.join(sub_level_lbl[0])]))
                        else :
                            update_log('technicalDebug',"IMPOSSIBLE 2", row)
                for pseudo in cur_dict["pseudo"] :
                    if "texte" in pseudo :
                        out_pseudo.append({'text':pseudo["texte"]})
                    elif "element" in pseudo :
                        if pseudo["element"] in cur_pseudo :
                            out_pseudo.extend(cur_pseudo[pseudo["element"]])
                        else :
                            update_log('technicalDebug',"ERROR",pseudo["element"])
                    else :
                        update_log('technicalDebug','IMPOSSIBLE pseudo')
            else :
                update_log('technicalDebug',"IMPOSSIBLE 1", row)
    
    return out_pseudo

###########################################-   MAIN PROCESS   -###########################################

########################- GENERATE RESULTS -########################

#- Cleaning Script

def split_rows(scrTxt, cur_intp) :
    if type(scrTxt) is str :
        scrLbrk, foundLbrk = None, len(scrTxt)
        #-- CHECK HYPOTHESIS : first linebrake found is the one used by interpreter (ATTENTION : text !!)
        for lbrk in get_syntax('linebreaks',cur_intp) :
            if find_symbol(scrTxt,lbrk) > -1 and find_symbol(scrTxt,lbrk) < foundLbrk :
                scrLbrk, foundLbrk = lbrk, find_symbol(scrTxt,lbrk)
        if scrLbrk != None :
            return [v+scrLbrk for v in scrTxt.split(scrLbrk)]
        else :
            update_log('inputDebug','ONELINE INPUT : no linebreak found ( %s )' % ''.join([scrTxt[:1000],' ...' if len(scrTxt) > 1000 else '']), get_syntax('linebreaks',cur_intp))
            return [scrTxt]
    elif type(scrTxt) is list :
        update_log('technicalWarning','UNEXPECTED INPUT : list')
        return scrTxt
    else :
        update_log('technicalWarning','UNEXPECTED INPUT : not str nor list')
        return []

def clean_code(fullCode, cur_intp):
    cleanedCode = [remove_lineBreak(r, cur_intp).rstrip() for r in fullCode]
    commentsCode = {}
    splittedCode = {}
    inLoop = False
    curQuote = None
    curStart = None
    curOpen = None
    curLast = None
    pos = 0
    #- iter_cnt = 0
    while pos < len(cleanedCode) :
        #- iter_cnt += 1
        #- iter_logger('clean_code',iter_cnt)
        row = trim_start(cleanedCode[pos])
        if len(row) > 0 :
            if not inLoop :
                row_type, row_info = map_row(row,cur_intp)
                if row_type :
                    if row_type.startswith('standardRow') :
                        curLast = None
                        pos += 1
                    elif row_type == 'fullComment' :
                        cmpos = pos if curLast == None else curLast
                        commentsCode[cmpos] = 'full'
                        cleanedCode[pos] = cleanedCode[pos].replace(row,'')
                        curLast = None
                        pos += 1
                    elif row_type == 'containComment' :
                        cmpos = pos if curLast == None else curLast
                        pos_in_cleaned = get_pos_from_isolated(cleanedCode[pos],row_info+cleanedCode[pos].find(row),cur_intp)
                        commentsCode[cmpos] = pos_in_cleaned - (len(cleanedCode[pos])-len(remove_lineBreak(fullCode[cmpos], cur_intp).rstrip()))
                        cleanedCode[pos] = cleanedCode[pos][:pos_in_cleaned] 
                    else :
                        if pos not in splittedCode : splittedCode[pos] = [pos]
                        inLoop, curQuote, curStart, curOpen = True, None, pos, None
                        
                        if row_type == 'continuingRow' :
                            cleanedCode[pos] = cleanedCode[pos][:-1].rstrip()
                        elif row_type == 'openQuote' :
                            if is_continuing(row,cur_intp) : cleanedCode[pos] = cleanedCode[pos][:-1].rstrip()
                            curQuote = row_info
                        elif row_type == 'openComment' :
                            curOpen = [pos, row_info]
                        elif row_type == 'openEncloser' :
                            curStart, curOpen = None, [pos, row_info]
                        else :
                            update_log('technicalDebug','ERROR impossible case in clean_code : ', row)
                        
                        curLast = None
                        pos += 1
                else :
                    update_log('technicalDebug','ERROR in clean_code : ',row_type,' returned by map_row for ', row)
                    curLast = None
                    pos += 1
            else :
                pos_curStart, joiner = None, ' '
                if curQuote :
                    if curStart != None :
                        if curOpen :
                            update_log('technicalDebug','ERROR impossible case in clean_code inLoop curQuote - curOpen : ', row)
                        pos_curStart = curStart
                    else :
                        update_log('technicalDebug','ERROR impossible case in clean_code inLoop curQuote : ', row)
                elif curStart != None :
                    if curOpen :
                        update_log('technicalDebug','CHECK new case in clean_code inLoop curStart : ', row)
                        if curStart != curOpen[0] :
                            update_log('inputDebug','WARNING unexpected case inLoop : ', row, ' (curStart : ', curStart, ', curOpen[0] : ', curOpen[0], ')')
                    pos_curStart = curStart
                elif curOpen :
                    if curStart != None :
                        update_log('technicalDebug','ERROR impossible case in clean_code inLoop curOpen : ', row)
                    pos_curStart = curOpen[0]
                else :
                    update_log('technicalDebug','ERROR impossible case in clean_code inLoop : ', row)
                
                if pos_curStart != None :
                    splittedCode[pos_curStart].append(pos)
                    cleanedCode[pos_curStart] += joiner + row
                    cleanedCode[pos] = cleanedCode[pos].replace(row,'')
                    curLast = pos
                    pos = pos_curStart
                    inLoop, curQuote, curStart, curOpen = False, None, None, None
        else :
            pos +=1
    return cleanedCode,commentsCode,splittedCode

#- Mapping Rows

def map_script(cleanedScript, update_rgx, cur_intp):
    known_exprs = {}
    known_regex = {}
    known_syntax = {}
    len_known = len(known_regex)
    update_log('executionLog',len_known)
    update_log('executionLog',len(known_exprs))
    mappingOut = {}
    for row,script in [(i,v) for i,v in enumerate(cleanedScript) if get_indent(v) >= 0] :
        map_out = iter_map_rgx(script.strip(),'code-row',known_regex,known_exprs,known_syntax,cur_intp)
        if map_out != 'blank' :
            mappingOut[row] = map_out
            mappingOut[row].append(get_indent(script))
    if len(known_regex) > len_known :
        update_log('executionLog',len(known_regex))
        update_log('executionLog',len(known_exprs))
    return mappingOut, known_exprs, known_regex, known_syntax

#- Mapping Blocks

def map_blocks(mappingResult, known_regex, cur_intp) :
    fwd_with_child = [vv['class']+'-'+vv['elem'] for vv in get_syntax('firstwords',cur_intp).values() if vv['end'] == ':']
    
    cur_level, prev_blk, main_indent, cur_base_indent = 0, None, 0, 4
    rows = list(mappingResult.keys())
    while len(rows) > 0 :
        update_log('executionLog','Level iteration ->',cur_level)
        prev_asChild, open_child, cur_blk, cur_row = False, False, 0, 0
        while cur_row < len(rows) :
            row = rows[cur_row]
            if mappingResult[row][2] == -1 :
                cur_row += 1
            else:
                if cur_level > 0 :
                    main_blk = '.'.join(mappingResult[row][-1].split('.')[:cur_level])
                    if main_blk != prev_blk :
                        cur_blk = 0
                        prev_blk = main_blk
                        cur_base_indent = 4
                        prev_asChild, open_child = False, False
                if not prev_asChild :
                    cur_blk += 1
                    if cur_level == 0 :
                        mappingResult[row].append(str(cur_blk))
                    else :
                        mappingResult[row][-1] = main_blk+'.'+str(cur_blk)
                    desc = known_regex[mappingResult[row][0]]
                    row_type = ' '.join(get_labeled_rgx(desc,level=0)[0])
                    if row_type in fwd_with_child and get_labeled_rgx(desc,level=1)[0][-1] == row_type :
                        prev_asChild = True
                        main_indent = mappingResult[row][2]
                        if main_indent > cur_base_indent*cur_level and is_division_int(main_indent,cur_base_indent) :
                            update_log('inputWarning','UNEXPECTED indent larger for first block row :', row+1, main_indent, cur_base_indent)
                        elif main_indent < cur_base_indent*cur_level and main_indent in [ base_indent*cur_level for base_indent in [3,2] ] :
                            update_log('inputWarning','UNEXPECTED indent smaller for first block row :', row+1, main_indent, cur_base_indent)
                            cur_base_indent = int(main_indent/cur_level)
                        elif main_indent != cur_base_indent*cur_level :
                            update_log('inputWarning','UNEXPECTED indent for first block row :', row+1, main_indent, cur_base_indent)
                            main_indent = cur_base_indent*cur_level
                    cur_row += 1
                elif not open_child :
                    if cur_level == 0 :
                        mappingResult[row].append(str(cur_blk)+'.0')
                    else :
                        mappingResult[row][-1] = main_blk+'.'+str(cur_blk)+'.0'
                    open_child = True
                    cur_row += 1
                elif prev_asChild and open_child :
                    row_indent = mappingResult[row][2]
                    if row_indent > main_indent :
                        if cur_level == 0 :
                            mappingResult[row].append(str(cur_blk)+'.0')
                        else :
                            mappingResult[row][-1] = main_blk+'.'+str(cur_blk)+'.0'
                        cur_row += 1
                    elif row_indent != -1 and row_indent <= main_indent :
                        prev_asChild, open_child = False, False
                        if cur_row+1 == len(rows) :
                            if cur_level == 0 :
                                mappingResult[row].append(str(cur_blk+1))
                            else :
                                mappingResult[row][-1] = main_blk+'.'+str(cur_blk+1)
                            break
                    else  :
                        update_log('technicalDebug','IMPOSSIBLE indent -1 for row :',row)
                else :
                    update_log('technicalWarning','UNEXPECTED open child :',row)
        cur_level += 1
        prev_blk, cur_base_indent = None, 4
        rows = [ k for k,v in mappingResult.items() if type(v) is list and len(v) == 4 and len(v[-1].split('.')) > cur_level ]

#- Mapping Elements

def map_elements(cleanedScript, mappingResult, known_exprs, known_regex, known_syntax, cur_intp) :
    rows = [ (k,v[1],[x for x in known_regex[v[0]]]) for k,v in mappingResult.items() if type(v) is list and len(v) == 4 ]
    out_elems = {}
    for label,rows_group in [
                              ('imp',[ r for r in rows if ' '.join(get_labeled_rgx(r[2],level=0)[0]).startswith('import') ])
                             ,('def',[ r for r in rows if ' '.join(get_labeled_rgx(r[2],level=0)[0]).startswith('assignement') and not ' '.join(get_labeled_rgx(r[2],level=0)[0]).startswith('assignement-from') ])
                             ,('int',[ r for r in rows if ' '.join(get_labeled_rgx(r[2],level=0)[0]) =='assignement-from' ])
                             ,('act',[ r for r in rows if not as_output(' '.join(get_labeled_rgx(r[2],level=0)[0])) ])
                            ] :
        update_log('executionLog','Group START ->',label)
        grp_elems = get_group_elems(rows_group, cleanedScript, known_exprs, known_regex, known_syntax,cur_intp)
        update_log('executionLog','Group COMPLET POS')
        for row,pos,lbl_pos in rows_group :
            if row in grp_elems :
                tmp_elems = [[],[]]
                if len(lbl_pos) != len(pos) :
                    update_log('technicalDebug','IMPOSSIBLE pos diff len from lbl_pos :',pos,lbl_pos)
                for p in range(len(lbl_pos)) :
                    if p in grp_elems[row] :
                        tmp_elems[0].append([lbl_pos[p],grp_elems[row][p]['pos']])
                        if 'name' in grp_elems[row][p] :
                            tmp_elems[1].append(grp_elems[row][p]['name'])
                        else :
                            tmp_elems[1].append(None)
                    else :
                        tmp_elems[0].append([lbl_pos[p]])
                        tmp_elems[1].append(None)
            else :
                tmp_elems = [[[x] for x in lbl_pos],[None for x in lbl_pos]]
            if row in out_elems :
                update_log('technicalDebug','IMPOSSIBLE row in ',label)
            out_elems[row] = [label,tmp_elems]
        update_log('executionLog','Group DONE')
    return out_elems

def map_rows_elms(cleanedScript, mappingResult, interElemMap, cur_intp) :
    elementsMap = {}
    for row in mappingResult :
        if row in interElemMap :
            elementsMap[row] = []
            for pos,pos_desc in enumerate(interElemMap[row][1][0]) :
                elementsMap[row].append([])
                for l in pos_desc :
                    for x in l :
                        elementsMap[row][-1].append(x)
                if interElemMap[row][1][1][pos] != None :
                    if 'type' in mappingResult[row][1][pos] :
                        update_log('technicalDebug','IMPOSSIBLE type for named lbl',row,':',pos_desc[-1][-1],interElemMap[row][1][1][pos], '\n', mappingResult[row][1][pos])
                    else :
                        mappingResult[row][1][pos]['type'] = 'lbl'
                        mappingResult[row][1][pos]['lbl'] = pos_desc[-1][-1]
                        mappingResult[row][1][pos]['name'] = interElemMap[row][1][1][pos]
                elif pos_desc[-1][-1] == 'identifier-main' :
                    if 'type' in mappingResult[row][1][pos] :
                        update_log('technicalDebug','IMPOSSIBLE type for identifier lbl',row,':',pos_desc[-1][-1],interElemMap[row][1][1][pos], '\n', mappingResult[row][1][pos])
                    else :
                        mappingResult[row][1][pos]['type'] = 'idm'
                        mappingResult[row][1][pos]['idm'] = pos_desc[-1][-1]
                        mappingResult[row][1][pos]['name'] = cleanedScript[row].lstrip()[mappingResult[row][1][pos]['start']:mappingResult[row][1][pos]['end']]
                elif mappingResult[row][1][pos]['reduce_rgx'] == " " :
                    if 'type' not in mappingResult[row][1][pos] :
                        mappingResult[row][1][pos]['type'] = 'blk'
                elif 'type' not in mappingResult[row][1][pos] :
                    mappingResult[row][1][pos]['type'] = 'val'
                    mappingResult[row][1][pos]['val'] = pos_desc[-1][-1]
                else :
                    mappingResult[row][1][pos]['lbl'] = pos_desc[-1][-1]
            mappingResult[row].append(interElemMap[row][0])
        else :
            update_log('technicalDebug','IMPOSSIBLE row not treated',row,':\n',cleanedScript[row])
    return elementsMap

#- Build Dictionnary

def get_rows_output(mappingResult,elementsMap,cleanedScript,cur_intp) :
    with_local = [ 'assignement-class','assignement-function','assignement-coroutine-function' ]
    blocksLocal = get_block_info(with_local,mappingResult,elementsMap)
    out,out_elems = {},{}
    counter = [0,0,0]
    base_counter = 0
    refSyntax = get_syntax('refSyntax',cur_intp)
    for iter_n,row in enumerate([k for k,v in mappingResult.items() if len(v) == 5]) :
        if iter_n in [1,10000,20000,40000,45000,50000] : 
            update_log('executionLog',iter_n,':',row)
        base_counter += 1
        main_level_lbl = get_labeled_rgx(elementsMap[row],level=0)
        mappingResult[row].append(' '.join(main_level_lbl[0]))
        internal_counter = [0,0]
        internal_out = []
        out_pseudo = iter_identify_elements(main_level_lbl,refSyntax,internal_counter
                                            ,elementsMap[row],cleanedScript[row],mappingResult[row][1],row,blocksLocal,mappingResult[row][3],internal_out,out_elems)
        out[row] = {"elements":internal_out,"pseudo":out_pseudo}
        if internal_counter != [0,0] :
            counter[0] += 1
            update_counter(counter,internal_counter)

    update_log('executionLog','CLEANED :',len(cleanedScript))
    update_log('executionLog',base_counter)
    update_log('executionLog','TREATED :',counter[0],'/',len(mappingResult),'(',len([1 for v in mappingResult.values() if len(v) == 6]),')')
    update_log('executionLog','-->',100*(counter[0]/len(mappingResult)),'%')
    if counter[0] > 0 :
        update_log('executionLog','OK :',counter[0]-sum(counter[1:]),'/',counter[0])
        update_log('executionLog','-->',100*(1-(sum(counter[1:])/counter[0])),'%')
        update_log('executionLog','KO Full :',counter[1],'/',counter[0])
        update_log('executionLog','-->',100*(counter[1]/counter[0]),'%')
        update_log('executionLog','KO Part :',counter[2],'/',counter[0])
        update_log('executionLog','-->',100*(counter[2]/counter[0]),'%')
    
    return out,out_elems

def append_chunck(mappingDict,r,cur_start,cur_end,cur_type,is_comment,elem_id=None) :
    from .dicts import format_dicts

    mappingDict[r]["row_compact"].append({ 
                                          "code": mappingDict[r]['str_clean'].lstrip()[cur_start:cur_end],
                                          "color": format_dicts['colors'][cur_type], 
                                          "elem_id" : elem_id,
                                          "elem_type" : cur_type,
                                          "is_comment" : is_comment
                                          })

    if mappingDict[r]['case'] in ['02','07','10'] :
        mappingDict[r]["row"].append({ 
                                      "code": mappingDict[r]['str_clean'].lstrip()[cur_start:cur_end],
                                      "color": format_dicts['colors'][cur_type], 
                                      "elem_id" : elem_id,
                                      "elem_type" : cur_type,
                                      "is_comment" : is_comment
                                      })
    elif mappingDict[r]['case'] in ['04','08','11'] :
        cor_len = len(mappingDict[r]["row_compact"][0]['code'])
        for sub_r in mappingDict[r]['split_list'] :
            if len(mappingDict[sub_r]["row"]) == 0 :
                mappingDict[sub_r]["row"].append({
                                                "code": mappingDict[sub_r]['str'][:mappingDict[sub_r]['start_origin']],
                                                "color": format_dicts['colors'][cur_type], 
                                                "elem_id" : elem_id,
                                                "elem_type" : cur_type,
                                                "is_comment" : is_comment
                                                })

            if mappingDict[sub_r]['start_clean'] <= cur_start+cor_len and mappingDict[sub_r]['end_clean'] >= cur_start+cor_len :
                if mappingDict[sub_r]['end_clean'] >= cur_end+cor_len :
                    mappingDict[sub_r]["row"].append({
                                                    "code": mappingDict[r]['str_clean'].lstrip()[cur_start:cur_end],
                                                    "color": format_dicts['colors'][cur_type], 
                                                    "elem_id" : elem_id,
                                                    "elem_type" : cur_type,
                                                    "is_comment" : is_comment
                                                    })
                else :
                    mappingDict[sub_r]["row"].append({
                                                    "code": mappingDict[r]['str_clean'].lstrip()[cur_start:mappingDict[sub_r]['end_clean']-cor_len],
                                                    "color": format_dicts['colors'][cur_type], 
                                                    "elem_id" : elem_id,
                                                    "elem_type" : cur_type,
                                                    "is_comment" : is_comment
                                                    })
            elif mappingDict[sub_r]['start_clean'] <= cur_end+cor_len and mappingDict[sub_r]['end_clean'] >= cur_end+cor_len :
                mappingDict[sub_r]["row"].append({
                                                "code": mappingDict[r]['str_clean'].lstrip()[mappingDict[sub_r]['start_clean']-cor_len:cur_end],
                                                "color": format_dicts['colors'][cur_type], 
                                                "elem_id" : elem_id,
                                                "elem_type" : cur_type,
                                                "is_comment" : is_comment
                                                })
            elif mappingDict[sub_r]['start_clean'] >= cur_start+cor_len and mappingDict[sub_r]['end_clean'] <= cur_end+cor_len :
                mappingDict[sub_r]["row"].append({
                                                "code": mappingDict[r]['str_clean'].lstrip()[mappingDict[sub_r]['start_clean']-cor_len:mappingDict[sub_r]['end_clean']-cor_len],
                                                "color": format_dicts['colors'][cur_type], 
                                                "elem_id" : elem_id,
                                                "elem_type" : cur_type,
                                                "is_comment" : is_comment
                                                })


def get_complete_mapping(originalScript,cleanedScript,commentsCode,splittedCode,mappingResult,labelResult,elementsMap,compact_option,cur_intp = 'py3') :
    mappingDict = {}
    quotedCode = { k:('td' if cleanedScript[k].startswith('"""') else 'ts' if cleanedScript[k].startswith("'''") 
                   else 'd' if cleanedScript[k].startswith('"') else 's')
                  for k,v in mappingResult.items() if len(v) == 6 and v[5] == 'value-text'}
    code_rows, oneline_rows =  0, 0
    prev_blank, cur_show_compact, cur_split, cur_type = False, True, None, None
    for row,script in enumerate(originalScript) :
        dictPresence = [False, False, False]
        dictValue = ['','','']
        for i,dictCode in enumerate([commentsCode, quotedCode, splittedCode]) :
            if row in dictCode :
                dictPresence[i] = True
                dictValue[i] = dictCode[row]
                if i == 2 : 
                    cur_split = dictCode[row]
                    cur_type = None
                    if dictValue[1] :
                        cur_type = 'quoted'

        blank_origin = script.replace('\t',4*' ').replace(' ','') == '\n'
        blank_clean = cleanedScript[row].replace('\t',4*' ').replace(' ','') == ''

        if not dictPresence[2] and cur_split != None :
            if row in cur_split :
                dictPresence[2] = 'Split'
                if cur_type == 'quoted' :
                    dictPresence[1] = True
                    dictValue[1] = script
            else :
                cur_split = None
                cur_type = None
        
        cur_comment = None
        if dictPresence[0] or dictPresence[1] :
            if ( dictPresence[0] and dictValue[0] == 'full' ) or dictPresence[1] :
                cur_comment = 'Full'
            else :
                cur_comment = 'Part'

            if dictPresence[0] and dictPresence[1] :
                update_log('technicalWarning','WARNING : unexpected mixed comments on row',row)
                for i in [0,1] :
                    if dictPresence[i] : update_log('technicalWarning',dictValue[i])

        if blank_clean :
            if not blank_origin and cur_comment != 'Full' :
                code_rows += 1
            if not blank_origin :
                cur_show_compact = False
                prev_blank = False
            else :
                if not prev_blank :
                    prev_blank = True
                    cur_show_compact = True
                else :
                    cur_show_compact = False
        else :
            code_rows += 1
            oneline_rows += 1
            prev_blank = False
            cur_show_compact = True
        
        mappingDict[row] = {  'rid' : row
                             ,'blkid' :  "." if row not in mappingResult else mappingResult[row][3]
                             ,'level' : None if row not in mappingResult else mappingResult[row][2]
                             ,'rblkid' : None
                             ,'elms_output' : [] if row not in labelResult else [v['eid'] for v in labelResult[row]['elements'] if v['eid'] != "value" and v['type'] == 'output' ]
                             ,'elms_input' : [] if row not in labelResult else [v['eid'] for v in labelResult[row]['elements'] if v['eid'] != "value" and v['type'] != 'output']
                             ,'str' : originalScript[row]
                             ,'str_clean' : cleanedScript[row]
                             ,'str_pseudo' : "." if row not in labelResult else mappingResult[row][3]+' - '+' '.join([v["text"] if v["text"] != None else "MISSING" for v in labelResult[row]['pseudo']])
                             ,'pseudo' : None if row not in labelResult else [ { psk:(str(psv+1) if psk=='eid' and is_numeric(psv) else psv) for psk,psv in psel.items() } for psel in labelResult[row]['pseudo'] ]
                             ,'is_blank' : blank_origin
                             ,'is_blank_clean' : blank_clean
                             ,'to_show' : cur_show_compact # DEFINITION : one line + remove multiple blank line
                             ,'full_comments' : cur_comment == 'Full'
                             ,'part_comments' : cur_comment == 'Part'
                             ,'one_line' : dictPresence[2]
                             ,'split_list' : dictValue[2] if dictPresence[2] == True else None
                             ,'user_comment' : '' # FRONT RECOIS CELUI-CI VIDE ET LE REMPLI QUAND BESOIN EN UTILISANT 'split_list'
                             ,'user_comment_split' : '' # BACK MEME A TERME ENVERRA CELUI CI
                             ,"row": []
                             ,"row_compact": []
                            }
        if row in commentsCode and commentsCode[row] != 'full' :
            mappingDict[row]['str_code'] = originalScript[row][:commentsCode[row]]
            mappingDict[row]['str_comment'] = remove_lineBreak(originalScript[row][commentsCode[row]:],cur_intp)
            cur_str_code = mappingDict[row]['str_code']
            cur_str_comment = mappingDict[row]['str_comment']
        elif row in commentsCode :
            mappingDict[row]['str_comment'] = remove_lineBreak(originalScript[row],cur_intp)
            cur_str_code = ''
            cur_str_comment = mappingDict[row]['str_comment']
        elif row in mappingResult and len(mappingResult[row]) == 6 and mappingResult[row][5] == 'value-text' :
            mappingDict[row]['str_comment'] = remove_lineBreak(originalScript[row],cur_intp)
            cur_str_code = ''
            cur_str_comment = mappingDict[row]['str_comment']
        elif len([1 for v in splittedCode.values() if row in v[1:]]) == 1 : 
            main_row = [v[0] for v in splittedCode.values() if row in v[1:]][0]
            if 'str_comment' in mappingDict[main_row] and 'str_code' not in mappingDict[main_row] :
                mappingDict[row]['str_comment'] = remove_lineBreak(originalScript[row],cur_intp)
                cur_str_code = ''
                cur_str_comment = mappingDict[row]['str_comment']
            else :
                mappingDict[row]['str_code'] = remove_lineBreak(originalScript[row],cur_intp)
                cur_str_code = mappingDict[row]['str_code']
                cur_str_comment = ''
        else :
            mappingDict[row]['str_code'] = remove_lineBreak(originalScript[row],cur_intp)
            cur_str_code = mappingDict[row]['str_code']
            cur_str_comment = ''

        if originalScript[row] != cur_str_code+cur_str_comment+'\n' :
            update_log('technicalDebug','!!! IMPOSSIBLE SPLIT !!!',row)
            update_log('technicalDebug',originalScript[row])
            update_log('technicalDebug',cur_str_code+cur_str_comment+'\n')
    
    last_level, cur_check = 0, None
    for r in mappingDict.keys() :
        mappingDict[r]['to_show_minimum'] = mappingDict[r]['to_show']
        if mappingDict[r]['to_show'] and mappingDict[r]['level'] == None :
            cur_check = r
        elif mappingDict[r]['level'] != None :
            if cur_check != None and mappingDict[r]['level'] >= last_level :
                mappingDict[cur_check]['to_show_minimum'] = False
            last_level, cur_check = mappingDict[r]['level'], None
            if not mappingDict[r]['to_show'] : 
                update_log('technicalWarning','CASE TO CHECK :',r)

    for r in mappingDict.keys() :
        if mappingDict[r]['to_show'+compact_option] :
            mappingDict[r]['show_compact'] = True
        elif mappingDict[r]['full_comments'] and mappingDict[r]['one_line'] != 'Split' :
            mappingDict[r]['show_compact'] = True
        else :
            mappingDict[r]['show_compact'] = False

    for row in mappingDict :
        if 'str_comment' in mappingDict[row] :
            if 'str_code' not in mappingDict[row] :
                if len([1 for v in splittedCode.values() if row in v]) == 0 :
                    if row not in mappingResult :
                        mappingDict[row]['case'] = '01'
                    else :
                        mappingDict[row]['case'] = '02'
                elif row in splittedCode :
                    if row not in mappingResult :
                        mappingDict[row]['case'] = '03'
                        update_log('technicalDebug','IMPOSSIBLE CASE G')
                    else :
                        mappingDict[row]['case'] = '04'
                else :
                    if [v[0] for v in splittedCode.values() if row in v][0] not in mappingResult :
                        mappingDict[row]['case'] = '05'
                        update_log('technicalDebug','IMPOSSIBLE CASE H')
                    else :
                        mappingDict[row]['case'] = '06'
            else :
                if len([1 for v in splittedCode.values() if row in v]) == 0 :
                    if row not in mappingResult :
                        update_log('technicalDebug','IMPOSSIBLE CASE A')
                    else :
                        mappingDict[row]['case'] = '07'
                elif row in splittedCode :
                    if row not in mappingResult :
                        update_log('technicalDebug','IMPOSSIBLE CASE B')
                    else :
                        mappingDict[row]['case'] = '08'
                else :
                    if row not in mappingResult :
                        mappingDict[row]['case'] = '09'
                    else :
                        update_log('technicalDebug','IMPOSSIBLE CASE C')
        elif 'str_code' in mappingDict[row] :
            if len([1 for v in splittedCode.values() if row in v]) == 0 :
                if row not in mappingResult :
                    mappingDict[row]['case'] = '00'
                    if mappingDict[row]['str'].replace('\n','').replace('\t','').replace(' ','') != '' :
                        update_log('technicalDebug',row,':',mappingDict[row])
                else :
                    mappingDict[row]['case'] = '10'
            elif row in splittedCode :
                if row not in mappingResult :
                    update_log('technicalDebug','IMPOSSIBLE CASE D')
                else :
                    mappingDict[row]['case'] = '11'
            else :
                if row not in mappingResult :
                    mappingDict[row]['case'] = '12'
                else :
                    update_log('technicalDebug','IMPOSSIBLE CASE E')
        else :
            update_log('technicalDebug','IMPOSSIBLE CASE F')
        
    for row in mappingDict :
        if mappingDict[row]['case'] in ['00','01'] : 
            if mappingDict[row]['str_clean'].strip() != '' :
                update_log('technicalDebug',row,':',mappingDict[row])
            else :
                mappingDict[row]['start_clean'] = None
                mappingDict[row]['end_clean'] = None
        elif mappingDict[row]['case'] in ['02'] :
            if mappingDict[row]['str_clean'].strip() != mappingDict[row]['str_comment'].strip() :
                update_log('technicalDebug',row,':',mappingDict[row])
            else :
                mappingDict[row]['start_origin'] = mappingDict[row]['str'].find(mappingDict[row]['str_comment'].strip())
                mappingDict[row]['start_clean'] = mappingDict[row]['str_clean'].find(mappingDict[row]['str_comment'].strip())
                mappingDict[row]['end_clean'] = mappingDict[row]['start_clean'] + len(mappingDict[row]['str_comment'].strip())
        elif mappingDict[row]['case'] in ['07','10'] :
            if mappingDict[row]['str_clean'].strip() != mappingDict[row]['str_code'].strip() :
                update_log('technicalDebug',row,':',mappingDict[row])
            else :
                mappingDict[row]['start_origin'] = mappingDict[row]['str'].find(mappingDict[row]['str_code'].strip())
                mappingDict[row]['start_clean'] = mappingDict[row]['str_clean'].find(mappingDict[row]['str_code'].strip())
                mappingDict[row]['end_clean'] = mappingDict[row]['start_clean'] + len(mappingDict[row]['str_code'].strip())
        elif mappingDict[row]['case'] in ['04','08','11'] :
            mp = mappingDict[row]['case']
            if mp == '04' : str_ref = 'str_comment'
            else : str_ref = 'str_code'
            prev_end = 0
            for r in splittedCode[row] :
                if is_continuing(mappingDict[r][str_ref].rstrip(),cur_intp = 'py3') :
                    if mappingDict[row]['str_clean'][prev_end:].find(mappingDict[r][str_ref].strip()[:-1]) == -1 :
                        update_log('technicalDebug',row,'-',r,':',mappingDict[row],mappingDict[r])
                    else :
                        mappingDict[r]['start_origin'] = mappingDict[r]['str'].find(mappingDict[r][str_ref].strip())
                        mappingDict[r]['start_clean'] = prev_end+mappingDict[row]['str_clean'][prev_end:].find(mappingDict[r][str_ref].strip()[:-1])
                        mappingDict[r]['end_clean'] = mappingDict[r]['start_clean'] + len(mappingDict[r][str_ref].strip()[:-1])
                else :
                    if mappingDict[row]['str_clean'][prev_end:].find(mappingDict[r][str_ref].strip()) == -1 :
                        update_log('technicalDebug',row,'-',r,':',mappingDict[row],mappingDict[r])
                    else :
                        mappingDict[r]['start_origin'] = mappingDict[r]['str'].find(mappingDict[r][str_ref].strip())
                        mappingDict[r]['start_clean'] = prev_end+mappingDict[row]['str_clean'][prev_end:].find(mappingDict[r][str_ref].strip())
                        mappingDict[r]['end_clean'] = mappingDict[r]['start_clean'] + len(mappingDict[r][str_ref].strip())
                prev_end = mappingDict[r]['end_clean']

    for row in mappingDict :
        if mappingDict[row]['case'] == '00' : 
            if mappingDict[row]['is_blank'] != True or mappingDict[row]['is_blank_clean'] != True :
                update_log('technicalDebug','UNEXPECTED 1 :',row)
        elif mappingDict[row]['case'] in ['01','06','09','12'] : 
            if mappingDict[row]['is_blank'] == True or mappingDict[row]['is_blank_clean'] != True :
                update_log('technicalDebug','UNEXPECTED 2 :',row)
        elif mappingDict[row]['case'] in ['02','04','07','08','10','11'] : 
            if mappingDict[row]['is_blank'] == True or mappingDict[row]['is_blank_clean'] == True :
                update_log('technicalDebug','UNEXPECTED 3 :',row)
        else :
            update_log('technicalDebug','IMPOSSIBLE in PYTHON :',row)

    for row in mappingResult :
        if mappingDict[row]['start_clean'] != mappingDict[row]['level'] :
            if mappingDict[row]['start_clean']*4 != mappingDict[row]['level'] :
                update_log('technicalDebug','UNEXPECTED INDENT 1 for CASE',mappingDict[row]['case'],':',row)
                update_log('technicalDebug',mappingDict[row]['start_clean'])
                update_log('technicalDebug',mappingDict[row]['level'])
            elif mappingDict[row]['str_clean'][:mappingDict[row]['start_clean']].replace('\t','').strip() != '' :
                update_log('technicalDebug','UNEXPECTED INDENT 2 for CASE',mappingDict[row]['case'],':',row)
                update_log('technicalDebug',mappingDict[row]['start_clean'])
                update_log('technicalDebug',mappingDict[row]['level'])
        row_units = mappingResult[row][1]
        if row_units[0]['start'] != 0 :
            update_log('technicalDebug','IMPOSSIBLE')
        # if mappingDict[row]['str_clean'][mappingDict[row]['start_clean']:mappingDict[row]['end_clean']] != mappingDict[row]['str_clean'].lstrip()[row_units[0]['start']:row_units[-1]['end']] :
        if mappingDict[row]['str_clean'][mappingDict[row]['start_clean']:mappingDict[row]['end_clean']] != mappingDict[row]['str_clean'].lstrip()[row_units[0]['start']:mappingDict[row]['end_clean']-mappingDict[row]['start_clean']] :
            update_log('technicalDebug',mappingDict[row]['case'],row)
            update_log('technicalDebug',mappingDict[row]['end_clean']-mappingDict[row]['start_clean'])
            update_log('technicalDebug',row_units[-1]['end'])
        if mappingDict[row]['case'] in ['02','07','10'] :
            if mappingDict[row]['split_list'] != None :
                update_log('technicalDebug','IMPOSSIBLE SPLIT TO CHECK',mappingDict[row]['case'],':',row)
        elif mappingDict[row]['case'] in ['04','08','11'] :
            if mappingDict[row]['split_list'] == None :
                update_log('technicalDebug','IMPOSSIBLE SPLIT TO CHECK',mappingDict[row]['case'],':',row)
        else :
            update_log('technicalDebug','IMPOSSIBLE CASE TO CHECK',mappingDict[row]['case'],':',row)
        
        if mappingDict[row]['case'] in ['02','07','10'] :
            if row_units[-1]['end'] != mappingDict[row]['end_clean']-mappingDict[row]['start_clean'] :
                update_log('technicalDebug','IMPOSSIBLE A')
        elif mappingDict[row]['case'] in ['04','08','11'] :
            if row_units[-1]['end'] < mappingDict[row]['end_clean']-mappingDict[row]['start_clean'] :
                update_log('technicalDebug','IMPOSSIBLE B')
            for r in mappingDict[row]['split_list'] :
                pass

    for row in mappingResult :
        row_units = mappingResult[row][1]
        if mappingDict[row]['case'] in ['04','08','11'] :
            prev_end = 0
            str_check = ''
            for r in mappingDict[row]['split_list'] :
                if mappingDict[r]['start_clean'] < prev_end :
                    update_log('technicalDebug','IMPOSSIBLE TO CHECK',row,'-',r)
                    update_log('technicalDebug',mappingDict[r]['start_clean'])
                    update_log('technicalDebug',prev_end)
                elif mappingDict[r]['start_clean'] != prev_end+1 and mappingDict[r]['start_clean'] != prev_end != 0 :
                    if mappingDict[row]['str_clean'][prev_end:mappingDict[r]['start_clean']].replace('\t','').replace(' ','') != '' :
                        update_log('technicalDebug',mappingDict[r]['start_clean'])
                        update_log('technicalDebug',prev_end)
                        update_log('technicalDebug','"'+mappingDict[row]['str_clean'][prev_end:mappingDict[r]['start_clean']]+'"')
                str_check += mappingDict[row]['str_clean'][prev_end:mappingDict[r]['end_clean']]
                prev_end = mappingDict[r]['end_clean']
            if mappingDict[row]['str_clean'][:len(str_check)] != str_check and mappingDict[row]['str_clean'][len(str_check):].replace('\t','').replace(' ','') != '' :
                update_log('technicalDebug','IMPOSSIBLE str_check')
                update_log('technicalDebug','"'+str_check+'"')
                update_log('technicalDebug','"'+mappingDict[row]['str_clean']+'"')
        if row not in labelResult :
            update_log('technicalDebug','UNEXPECTED MISSING',row)

    for row in mappingDict :
        if mappingDict[row]['case'] == '01' :
            mappingDict[row]["row_compact"].append({"code": mappingDict[row]['str_comment'],
                                                    "color": "#49be25",
                                                    "elem_id" : None,
                                                    "elem_type" : None,
                                                    "is_comment" : True
                                                    })
            mappingDict[row]["row"].append({"code": mappingDict[row]['str_comment'],
                                            "color": "#49be25",
                                            "elem_id" : None,
                                            "elem_type" : None,
                                            "is_comment" : True
                                            })
        elif row in mappingResult :
            cur_full_text = True if mappingDict[row]['case'] in ['02','04'] else False
            mappingDict[row]["row_compact"].append({"code": cleanedScript[row][:cleanedScript[row].find(cleanedScript[row].lstrip())], #' '*mappingResult[row][2]
                                                    "color": "#BABABA",
                                                    "elem_id" : None,
                                                    "elem_type" : None,
                                                    "is_comment" : cur_full_text
                                                    })
            mappingDict[row]["row"].append({"code": cleanedScript[row][:cleanedScript[row].find(cleanedScript[row].lstrip())], #' '*mappingResult[row][2]
                                            "color": "#BABABA",
                                            "elem_id" : None,
                                            "elem_type" : None,
                                            "is_comment" : cur_full_text
                                            })
            row_units = mappingResult[row][1]
            row_elems = labelResult[row]["elements"]
            if sorted([v["pos"][0] for v in row_elems]) != [v["pos"][0] for v in row_elems] :
                update_log('technicalWarning','!!! ATTENTION !!! not originally ordered row_elems :',row)
                pos_elms = sorted([v["pos"][0] for v in labelResult[row]["elements"]])
                row_elems = []
                for p in pos_elms :
                    row_elems.extend([v for v in labelResult[row]["elements"] if v["pos"][0]==p])
            row_lbl = get_labeled_rgx(elementsMap[row])
            
            cur_unit, cur_elm = 0, 0
            while cur_unit < len(row_units) :
                if cur_elm < len(row_elems) and cur_unit == row_elems[cur_elm]['pos'][0] :
                    cur_id = row_elems[cur_elm]['eid']
                    if cur_id != "value" :
                        if row_elems[cur_elm]['type'] in ['output','input'] :
                            cur_type = row_elems[cur_elm]['type']
                        else :
                            cur_type = 'input'
                        append_chunck(mappingDict,row,row_units[row_elems[cur_elm]['pos'][0]]['start'], row_units[row_elems[cur_elm]['pos'][-1]]['end'], cur_type, cur_full_text, cur_id)
                    elif str(row_elems[cur_elm]['lbl_type']).startswith('value') :
                        cur_type = str(row_elems[cur_elm]['lbl_type']).split('-')[1]
                        if cur_type not in ['text','num'] :
                            cur_type_set = list(set([row_units[p]['type'] for p in row_elems[cur_elm]['pos'] if row_units[p]['type']!='blk']))
                            if len(cur_type_set) == 1 and cur_type_set[0] == 'kwd' :
                                cur_type = 'kwd'
                            else :
                                cur_type = 'standard'
                                update_log('technicalWarning','UNEXPECTED CUR_TYPE_SET :',cur_type_set)
                        append_chunck(mappingDict,row,row_units[row_elems[cur_elm]['pos'][0]]['start'], row_units[row_elems[cur_elm]['pos'][-1]]['end'], cur_type, cur_full_text)
                    else :
                        cur_type = 'standard'
                        append_chunck(mappingDict,row,row_units[row_elems[cur_elm]['pos'][0]]['start'], row_units[row_elems[cur_elm]['pos'][-1]]['end'], cur_type, cur_full_text)
                    cur_unit = row_elems[cur_elm]['pos'][-1]
                    cur_elm += 1
                elif cur_elm >= len(row_elems) or cur_unit < row_elems[cur_elm]['pos'][0] :
                    if len([i for i,x in enumerate(row_lbl[1]) if cur_unit in x]) > 0 :
                        cur_lbl = [i for i,x in enumerate(row_lbl[1]) if cur_unit in x][0]
                        if cur_elm < len(row_elems) and row_lbl[1][cur_lbl][-1] >= row_elems[cur_elm]['pos'][0] :
                            cur_pos_list = [pos for pos in row_lbl[1][cur_lbl] if pos >= cur_unit and pos < row_elems[cur_elm]['pos'][0]]
                        else :
                            cur_pos_list = [pos for pos in row_lbl[1][cur_lbl] if pos >= cur_unit]
                        cur_type_set = list(set([row_units[p]['type'] for p in cur_pos_list if row_units[p]['type']!='blk']))
                        if len(cur_type_set) == 1 and cur_type_set[0] in ['kwd','fwd','sym'] :
                            cur_type = cur_type_set[0]
                        elif str(row_lbl[0][cur_lbl]).startswith('value') :
                            cur_type = str(row_lbl[0][cur_lbl]).split('-')[1]
                        else :
                            cur_type = 'standard'
                        append_chunck(mappingDict,row,row_units[cur_unit]['start'], row_units[cur_pos_list[-1]]['end'], cur_type, cur_full_text)
                        cur_unit = row_lbl[1][cur_lbl][-1]
                        cur_unit = cur_pos_list[-1]
                    else :
                        if row_units[cur_unit]['type'] in ['kwd','fwd','sym'] :
                            cur_type = row_units[cur_unit]['type']
                        elif row_units[cur_unit]['type'] == 'val' and str(row_units[cur_unit]['val']).startswith('value-') :
                            cur_type = str(row_units[cur_unit]['val']).split('-')[1]
                            if cur_type not in ['text','num'] :
                                cur_type = 'standard'
                                update_log('technicalWarning','UNEXPECTED CUR_TYPE 1')
                        elif 'lbl' in row_units[cur_unit] and str(row_units[cur_unit]['lbl']).startswith('value-') :
                            cur_type = str(row_units[cur_unit]['lbl']).split('-')[1]
                            if cur_type not in ['text','num'] :
                                cur_type = 'standard'
                                update_log('technicalWarning','UNEXPECTED CUR_TYPE 2')
                        else :
                            cur_type = 'standard'
                        append_chunck(mappingDict,row,row_units[cur_unit]['start'], row_units[cur_unit]['end'], cur_type, cur_full_text)
                else :
                    update_log('technicalDebug','IMPOSSIBLE CASE TO CHECK in row_elems')
                cur_unit += 1
            
            if ''.join([v["code"] for v in mappingDict[row]["row_compact"]]) != mappingDict[row]["str_clean"] :
                if mappingDict[row]["str_clean"][len(''.join([v["code"] for v in mappingDict[row]["row_compact"]])):].replace('\t','').replace(' ','') == '' :
                    append_chunck(mappingDict,row,len(''.join([v["code"] for v in mappingDict[row]["row_compact"][1:]])), len(mappingDict[row]["str_clean"].lstrip()), 'standard', cur_full_text)
                elif mappingDict[row]["str_clean"][:mappingDict[row]["str_clean"].find(mappingDict[row]["str_clean"].lstrip())].replace('\t','').replace(' ','') == '' :
                    update_log('technicalDebug','IMPOSSIBLE IN ACTUAL')

            if ''.join([v["code"] for v in mappingDict[row]["row_compact"]]) != mappingDict[row]["str_clean"] :
                    update_log('technicalDebug','---> ERROR CLEAN RECOMPOSITION',row)
                    update_log('technicalDebug',len(''.join([v["code"] for v in mappingDict[row]["row_compact"]])))
                    update_log('technicalDebug','"'+''.join([v["code"] for v in mappingDict[row]["row_compact"]])+'"')
                    update_log('technicalDebug','"'+mappingDict[row]["str_clean"][:mappingDict[row]["str_clean"].find(mappingDict[row]["str_clean"].lstrip())]+'"')
                    update_log('technicalDebug','"'+mappingDict[row]["str_clean"]+'"')

    for row in mappingDict :
        if mappingDict[row]['case'] not in ['00','01'] :
            str_ref = 'str_comment' if mappingDict[row]['case'] in ['02','04','06'] else 'str_code'

            if ''.join([v["code"] for v in mappingDict[row]["row"]]) != mappingDict[row][str_ref] :
                tmp = mappingDict[row][str_ref][len(''.join([v["code"] for v in mappingDict[row]["row"]])):]
                if tmp.replace('\t','').replace(' ','') == '' or (is_continuing(tmp.replace('\t','').replace(' ',''),cur_intp) and len(tmp.replace('\t','').replace(' ',''))==1) :
                    mappingDict[row]["row"].append({
                                                    "code": tmp,
                                                    "color": "#BABABA", 
                                                    "elem_id" : None,
                                                    "elem_type" : None,
                                                    "is_comment" : True if mappingDict[row]['case'] in ['02','04','06'] else False
                                                    })
                    
            if ''.join([v["code"] for v in mappingDict[row]["row"]]) != mappingDict[row][str_ref] :
                update_log('technicalDebug','---> ERROR ORIGIN CODE RECOMPOSITION',row)
                update_log('technicalDebug','"'+''.join([v["code"] for v in mappingDict[row]["row"]])+'"')
                update_log('technicalDebug','"'+mappingDict[row][str_ref]+'"')

    for row in mappingDict :
        if mappingDict[row]['case'] == '00' :
            mappingDict[row]["is_comments"] = False
            mappingDict[row]["has_comments"] = False
        elif mappingDict[row]['case'] in ['01','02','04','06'] :
            mappingDict[row]["is_comments"] = True
            mappingDict[row]["has_comments"] = False
        elif mappingDict[row]['case'] in ['07','08'] :
            mappingDict[row]["is_comments"] = False
            mappingDict[row]["has_comments"] = True
            mappingDict[row]["row_compact"].append({"code": mappingDict[row]['str_comment'],
                                                    "color": "#49be25",
                                                    "elem_id" : None,
                                                    "elem_type" : None,
                                                    "is_comment" : True
                                                    })
            mappingDict[row]["row"].append({"code": mappingDict[row]['str_comment'],
                                            "color": "#49be25",
                                            "elem_id" : None,
                                            "elem_type" : None,
                                            "is_comment" : True
                                            })
        elif mappingDict[row]['case'] in ['10','11'] :
                mappingDict[row]["is_comments"] = False
                mappingDict[row]["has_comments"] = False

        if mappingDict[row]['case'] in ['08','11'] :
            for sub_r in mappingDict[row]['split_list'][1:] :
                if mappingDict[sub_r]['case'] == '09' :
                    mappingDict[row]["has_comments"] = True
                    mappingDict[sub_r]["is_comments"] = False
                    mappingDict[sub_r]["has_comments"] = True
                    mappingDict[row]["row_compact"].append({"code": mappingDict[sub_r]['str_comment'],
                                                            "color": "#49be25",
                                                            "elem_id" : None,
                                                            "elem_type" : None,
                                                            "is_comment" : True
                                                            })
                    mappingDict[sub_r]["row"].append({"code": mappingDict[sub_r]['str_comment'],
                                                        "color": "#49be25",
                                                        "elem_id" : None,
                                                        "elem_type" : None,
                                                        "is_comment" : True
                                                    })
                elif mappingDict[sub_r]['case'] == '12' :
                    mappingDict[sub_r]["is_comments"] = False
                    mappingDict[sub_r]["has_comments"] = False
                else :
                    update_log('technicalDebug','UNEXPECTED SUB ROW CASE :',mappingDict[sub_r]['case'],', row :',sub_r)
 
    for row in mappingDict :
        if mappingDict[row]['case'] not in ['00','01'] :
            if ''.join([v["code"] for v in mappingDict[row]["row"]]) != remove_lineBreak(mappingDict[row]['str'],cur_intp) :
                update_log('technicalDebug','---> ERROR ORIGIN RECOMPOSITION',row)
                update_log('technicalDebug','"'+''.join([v["code"] for v in mappingDict[row]["row"]])+'"')
                update_log('technicalDebug','"'+mappingDict[row][str_ref]+'"')

        mappingDict[row]["row_compact"].append({"code": '\n',
                                                "color": "#BABABA",
                                                "elem_id" : None,
                                                "elem_type" : None,
                                                "is_comment" : True if mappingDict[row]['case'] in ['01','02','04','06'] else False
                                                })
        mappingDict[row]["row"].append({"code": '\n',
                                        "color": "#BABABA",
                                        "elem_id" : None,
                                        "elem_type" : None,
                                        "is_comment" : True if mappingDict[row]['case'] in ['01','02','04','06'] else False
                                        })

    for row in mappingDict :
        if len(mappingDict[row]["row"]) > 1 :
            mappingDict[row]["row"][1]["code"] = mappingDict[row]["row"][0]["code"] + mappingDict[row]["row"][1]["code"]
            mappingDict[row]["row"] = mappingDict[row]["row"][1:]
        if len(mappingDict[row]["row_compact"]) > 1 :
            mappingDict[row]["row_compact"][1]["code"] = mappingDict[row]["row_compact"][0]["code"] + mappingDict[row]["row_compact"][1]["code"]
            mappingDict[row]["row_compact"] = mappingDict[row]["row_compact"][1:]

    return mappingDict, code_rows, oneline_rows, len(commentsCode.keys())

########################- FORMAT RESULTS -########################

#- Technical Doc

def format_ids(raw_out) :
    zfill_len_rows = len(str(len(raw_out['scriptDoc'])))
    zfill_len_elems = len(str(len(raw_out['elementsDoc'])))
    for kk,vv in raw_out['scriptDoc'].items() :
        r = vv['rid']+1
        raw_out['scriptDoc'][kk]['rid'] = str(r).zfill(zfill_len_rows)
        raw_out['scriptDoc'][kk]['elms_output'] = [str(e+1).zfill(zfill_len_elems) for e in vv['elms_output'] if e != 'value']
        raw_out['scriptDoc'][kk]['elms_input'] = [str(e+1).zfill(zfill_len_elems) for e in vv['elms_input'] if e != 'value']
        zfill_len_pos = len(str(len(raw_out['scriptDoc'][kk]['row'])))
        for el_pos,el in enumerate(raw_out['scriptDoc'][kk]['row']) :
            raw_out['scriptDoc'][kk]['row'][el_pos]['id1'] = "id"+str(r)+str(el_pos+1).zfill(zfill_len_pos)
            if el['elem_id'] != None :
                e = el['elem_id']
                raw_out['scriptDoc'][kk]['row'][el_pos]['elem_id'] = str(e+1).zfill(zfill_len_elems)
        zfill_len_pos = len(str(len(raw_out['scriptDoc'][kk]['row_compact'])))
        for el_pos,el in enumerate(raw_out['scriptDoc'][kk]['row_compact']) :
            raw_out['scriptDoc'][kk]['row_compact'][el_pos]['id1'] = "id"+str(r)+str(el_pos+1).zfill(zfill_len_pos)
            if el['elem_id'] != None :
                e = el['elem_id']
                raw_out['scriptDoc'][kk]['row_compact'][el_pos]['elem_id'] = str(e+1).zfill(zfill_len_elems)
    for kk,vv in raw_out['elementsDoc'].items() :
        raw_out['elementsDoc'][kk]['eid'] = str(kk+1).zfill(zfill_len_elems)
        raw_out['elementsDoc'][kk]['rows'] = [str(r+1).zfill(zfill_len_rows) for r in vv['rows']]

    return raw_out
    #TO DO
    def format_blockDoc() :
        for bk,bv in v['blockDet'].items() :
            for rk,rv in bv['0']['rows'].items() :
                r = str( int(rk) + 1 )
                formatted_out[k]['scriptDoc'][r]['level'] = rv['level']
                if 'detail' in rv.keys() :
                    formatted_out[k]['scriptDoc'][r]['rblkid'] = bk
                    formatted_out[k]['scriptDoc'][r]['detail'] = rv['detail']
                else :
                    formatted_out[k]['scriptDoc'][r]['rblkid'] = bk + rv['id'][1:]
                    formatted_out[k]['scriptDoc'][r]['detail'] = bv[str(rv['level'])][rv['id']]['rows'][rk]['detail']
            
            formatted_out[k]['blockDoc'][bk] = {  }
            for kk,vv in bv.items() :
                if kk == '0' :
                    formatted_out[k]['blockDoc'][bk][kk] = { key:val if key != 'rows' else [ str( int(rk) + 1 ) for rk in val.keys() ] for key,val in vv.items() }
                else :
                    formatted_out[k]['blockDoc'][bk][kk] = { }
                    for kkk,vvv in vv.items() :
                        formatted_out[k]['blockDoc'][bk][kk][kkk] = { key:val if key != 'rows' else [ str( int(rk) + 1 ) for rk in val.keys() ] for key,val in vvv.items() }

#- Dashboard Doc

def format_dashboardDoc(formatted_out, code_rows, oneline_rows, comm_rows, usr_data, type_to_show = ['package','class']) :
    from datetime import datetime as dt
    for v in formatted_out['techDoc']['elementsDoc'].values() :
        for key,val in v.items() :                    
            if key not in formatted_out['filterElemnts'] :
                formatted_out['filterElemnts'][key] = []
            formatted_out['filterElemnts'][key].append(val)
    
    for key,vals in formatted_out['filterElemnts'].items() :
        formatted_out['filterElemnts'][key] = [{'name':val} for val in sorted(set(str(v) for v in vals))]
    
    formatted_out['listElemnts'] = list(formatted_out['filterElemnts'].keys())
    
    nowDt = str(dt.now().date()).split('-') 
    formatted_out['dashboardDoc'] = {
        "id_project": "oiregjrofgfdigdfgfd",
        "name": usr_data['demoAlias'],
        "desc": usr_data['demoDescription'],
        "date": '-'.join([nowDt[2],nowDt[1],nowDt[0]]),
        "update": '-'.join([nowDt[2],nowDt[1],nowDt[0]]),
        "creator": usr_data['demoUserAlias'],
        "nbperpg" : 7,
        "statement": [
            { "title": "lignes", "num": len(formatted_out['techDoc']['scriptDoc'].keys()), "checked" : True, "class" : "script" },
            { "title": "lignes code", "num": code_rows, "checked" : True, "class" : "lignes" },
            { "title": "lignes code compact", "num": oneline_rows, "checked" : True, "class" : "lignes" },
            { "title": "commentaires", "num": comm_rows, "checked" : True, "class" : "lignes" },
            { "title": "elements", "num": len(formatted_out['techDoc']['elementsDoc'].keys()), "checked" : True, "class" : "script" },
        ],
        "image": "https://bestofbusinessanalyst.fr/wp-content/uploads/2018/01/Gestion-de-Projets_Accueil1.jpg",
        "Alertes": { "functionning": 12, "folders": 0, "Ethics": 0 },
        "Teams": [
            { "id_user": "ioyhdgioaioekngvhfgu" },
            { "id_user": "iodfghiioeaziotfgf" },
            { "id_user": "dquisfgazuioehgfrjghg" },
            { "id_user": "doighqiogdifgjdfig" }
            ],
        "Quality": [
            { "title": "Complétion", "number": int(round((comm_rows/code_rows)*100,0)) if code_rows > 0 else 0 },
            ],
        "DocTech": { "date": '-'.join([nowDt[2],nowDt[1],nowDt[0]]), "update": '-'.join([nowDt[2],nowDt[1],nowDt[0]]) },
        "UserGuide": { "date": '-'.join([nowDt[2],nowDt[1],nowDt[0]]), "update": '-'.join([nowDt[2],nowDt[1],nowDt[0]]) },
        "Testing": {
            "date": '-'.join([nowDt[2],nowDt[1],nowDt[0]]),
            "status": True
            },
        "Connector": {}
    }

    totEls = formatted_out['dashboardDoc']["statement"][4]["num"]
    for case in [ d['name'] for d in formatted_out['filterElemnts']['type'] ] :
        curn = 0
        for v in formatted_out['techDoc']['elementsDoc'].values() :
            for key,val in v.items() :                    
                if key == 'type' and val == case :
                    curn += 1
        formatted_out['dashboardDoc']["statement"].append({ "title": case, "num": curn, "checked" : case in type_to_show, "class" : "elements" })
        formatted_out['dashboardDoc']["Quality"].append({ "title": "Part de "+case, "number": int(round((curn/totEls)*100,0)) if totEls > 0 else 0 })
    return formatted_out


############################################- FRONT CALLS -############################################

########################-   INTERPRETER   -########################

def documentScriptElements(scrCode, update_rgx = False, cur_lng = 'fr', cur_intp = 'py3', compact_option = '_minimum') :
    create_rep_code('first')
    update_log('first')

    update_log('mainLog','-GCE-timestamp-','STARTING DOCUMENTATION PROCESS')

    originalScript = split_rows(scrCode, cur_intp)
    update_log('mainLog','-GCE-timestamp-','Rows Split DONE')

    cleanedScript, commentsCode, splittedCode = clean_code(originalScript, cur_intp)
    update_log('mainLog','-GCE-timestamp-','Cleaning Script DONE')

    mappingResult, known_exprs, known_regex, known_syntax = map_script(cleanedScript, update_rgx, cur_intp)
    update_log('mainLog','-GCE-timestamp-','Mapping Rows DONE')

    map_blocks(mappingResult, known_regex, cur_intp)
    update_log('mainLog','-GCE-timestamp-','Mapping Blocks DONE')

    elementsMap = map_rows_elms(cleanedScript, mappingResult, map_elements(cleanedScript, mappingResult, known_exprs, known_regex, known_syntax, cur_intp), cur_intp)
    update_log('mainLog','-GCE-timestamp-','Mapping Elements DONE')

    labelResult,environnementDict = get_rows_output(mappingResult,elementsMap,cleanedScript,cur_intp)
    update_log('mainLog','-GCE-timestamp-','Labeling Elements DONE')

    mappingDict, code_rows, oneline_rows, comm_rows = get_complete_mapping(originalScript,cleanedScript,commentsCode,splittedCode,mappingResult,labelResult,elementsMap,compact_option)
    update_log('mainLog','-GCE-timestamp-','Mapping Completion DONE')

    # for ms in sorted(missing) : update_log('technicalDebug',ms)

    techDoc = {'scriptDoc':mappingDict,'elementsDoc':environnementDict,'out_log':cur_log} # 'blockDoc':blocksDict,
    update_log('mainLog','-GCE-timestamp-','---- TECH DOC DICTIONNARY DONE ----')

    update_log('last')
    create_rep_code('last')
    
    return techDoc, code_rows, oneline_rows, comm_rows

########################-   MASK   -########################

def formatRes(raw_out, code_rows, oneline_rows, comm_rows, usr_data, front_name='Demo') :
    frontDict = {"techDoc":format_ids(raw_out),
                 'listElemnts':{},
                 'filterElemnts':{},
                 'dashboardDoc':{}
                 }    
    return format_dashboardDoc(frontDict, code_rows, oneline_rows, comm_rows, usr_data)