#!/bin/bash
export OP;

while getopts il: OPT  
do  
  case $OPT  in
    i) 
        OP="$OP --incremental";
    ;;
    l) 
        l="$OPTARG" 
        OP="$OP --limit_posts $l";
    ;;
  esac
done

#bundle exec jekyll serve $OP

jekyll serve $OP