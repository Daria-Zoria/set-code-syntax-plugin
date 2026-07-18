const htmlUI = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root{
    /* Vario warm system */
    --orange:        #E8552D;
    --orange-hover:  #D2461F;
    --orange-press:  #BC3D18;
    --orange-soft:   #FCEEE7;
    --orange-soft-bd:#F3CFBE;
    --orange-tint:   #FBF3EE;

    --ink-900: #1F1815;
    --ink-700: #4A413B;
    --ink-500: #8A7F77;
    --ink-400: #A99E96;
    --ink-300: #C8BEB6;

    --paper:    #FFFDFB;
    --surface:  #FBF7F2;
    --surface-2:#F6F0E9;
    --line:     #ECE3D9;
    --line-2:   #E3D8CC;

    /* platform accents — warm, harmonized */
    --web:     #E8552D;
    --android: #4E8A56;
    --ios:     #7B66A8;

    --ink-950: #15110E;
    --sel-fill: rgba(31,24,21,.055);

    --r-sm: 8px;
    --r-md: 12px;
    --r-lg: 16px;
    --shadow-btn: 0 1px 0 rgba(0,0,0,.04), 0 8px 18px -10px rgba(31,24,21,.55);

    /* semantic tokens (theme-aware) */
    --btn-bg: var(--ink-900);
    --btn-bg-hover: var(--ink-950);
    --btn-bg-press: var(--ink-950);
    --btn-fg: #fff;
    --chip-on-bg: #1f18150e;
  }

  /* ── Dark theme (no absolute black) ── */
  [data-theme="dark"]{
    --orange:#F2693F; --orange-hover:#FF7A50; --orange-press:#FF9166;
    --orange-soft:#3A241B; --orange-soft-bd:#5A3322; --orange-tint:#2C1E16;
    --ink-900:#F3ECE4; --ink-700:#CFC4B9; --ink-500:#9C9085; --ink-400:#7C7065; --ink-300:#5C5249;
    --ink-950:#FFFFFF;
    --paper:#221E1A; --surface:#1C1814; --surface-2:#2D2722; --line:#332D27; --line-2:#41382F;
    --web:#F2693F; --android:#6BB073; --ios:#A38FCB;
    --sel-fill:rgba(255,255,255,.06);
    --chip-on-bg:rgba(255,255,255,.06);
    --btn-bg:#F3ECE4; --btn-bg-hover:#FFFFFF; --btn-bg-press:#E7DCD0; --btn-fg:#221E1A;
    --shadow-btn:0 1px 0 rgba(0,0,0,.2), 0 8px 18px -10px rgba(0,0,0,.6);
  }
  [data-theme="dark"] body{background:radial-gradient(120% 90% at 50% -10%, #2A241E 0%, #211C17 55%, #18130F 100%);}
  [data-theme="dark"] .window{border-color:rgba(255,255,255,.06);
    box-shadow:0 1px 0 rgba(255,255,255,.05) inset,0 40px 80px -30px rgba(0,0,0,.7),0 12px 28px -16px rgba(0,0,0,.6);}
  [data-theme="dark"] .col-item.sel .cb,
  [data-theme="dark"] .opt-row.sel .opt-cb,
  [data-theme="dark"] .type-opt.sel .opt-cb{background:var(--orange);border-color:var(--orange);}
  [data-theme="dark"] .done-ic{background:var(--orange);}
  [data-theme="dark"] .stage-label{color:#9a8a78;}
  [data-theme="dark"] .theme-toggle{background:rgba(255,255,255,.05);}
  [data-theme="dark"] .body::-webkit-scrollbar-thumb,
  [data-theme="dark"] .ov-scroll::-webkit-scrollbar-thumb,
  [data-theme="dark"] .log-list::-webkit-scrollbar-thumb,
  [data-theme="dark"] .contact-scroll::-webkit-scrollbar-thumb{background:#4a4038;border-color:var(--paper);}
  html{transition:none;}
  body, .window, .titlebar, .steps, .body, .footer, .metabar, .overlay, .contact-page,
  .col-item, .opt-row, .type-opt, .chip{transition:background-color .25s ease, border-color .25s ease, color .25s ease;}

  *{box-sizing:border-box;margin:0;padding:0;}
  html,body{height:100%;}
  body{
    font-family:"Instrument Sans",-apple-system,system-ui,sans-serif;
    background:
      radial-gradient(120% 90% at 50% -10%, #F4ECE2 0%, #EBE0D3 55%, #E4D7C7 100%);
    color:var(--ink-900);
    -webkit-font-smoothing:antialiased;
    display:flex;flex-direction:column;align-items:center;justify-content:flex-start;
    gap:22px;padding:36px 20px 40px;min-height:100%;
  }
  .stage-label{
    text-align:center;color:#8c7c6a;font-size:12px;font-weight:600;
    letter-spacing:.14em;text-transform:uppercase;
    display:flex;align-items:center;gap:10px;
  }
  .stage-label .dot{width:5px;height:5px;border-radius:50%;background:var(--orange);}

  /* ── Plugin window ── */
  .window{
    width:400px;height:650px;flex-shrink:0;background:var(--paper);
    border-radius:18px;overflow:hidden;
    box-shadow:
      0 1px 0 rgba(255,255,255,.6) inset,
      0 40px 80px -30px rgba(70,40,20,.45),
      0 12px 28px -16px rgba(70,40,20,.35);
    display:flex;flex-direction:column;position:relative;
    border:1px solid rgba(255,255,255,.5);
  }

  /* Title bar */
  .titlebar{
    height:52px;flex-shrink:0;display:flex;align-items:center;gap:11px;
    padding:0 16px;background:var(--paper);border-bottom:1px solid var(--line);
  }
  .brand-mark{
    width:30px;height:30px;border-radius:9px;flex-shrink:0;
    background:var(--orange);display:flex;align-items:center;justify-content:center;
    box-shadow:0 3px 8px -2px rgba(232,85,45,.5);
  }
  .brand-mark svg{display:block;}
  .titlebar .name{font-size:14px;font-weight:600;letter-spacing:-.01em;flex:1;}
  .titlebar .x{
    width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;
    color:var(--ink-400);cursor:pointer;transition:.15s;
  }
  .titlebar .x:hover{background:var(--surface-2);color:var(--ink-700);}

  /* Step indicator */
  .steps{
    flex-shrink:0;display:flex;align-items:center;gap:0;
    padding:14px 18px 4px;background:var(--paper);
  }
  .step{display:flex;align-items:center;gap:8px;flex:0 0 auto;}
  .step-dot{
    width:22px;height:22px;border-radius:50%;flex-shrink:0;
    display:flex;align-items:center;justify-content:center;
    font-size:11px;font-weight:700;border:1.5px solid var(--line-2);
    color:var(--ink-400);background:var(--paper);transition:.2s;
  }
  .step.active .step-dot{background:var(--orange);border-color:var(--orange);color:#fff;box-shadow:0 4px 10px -3px rgba(232,85,45,.45);}
  .step.done .step-dot{background:var(--surface-2);border-color:var(--line-2);color:var(--ink-700);}
  .step-name{font-size:12px;font-weight:600;color:var(--ink-400);transition:.2s;white-space:nowrap;}
  .step.active .step-name{color:var(--ink-900);}
  .step.done .step-name{color:var(--ink-700);}
  .step-bar{flex:1;height:1.5px;background:var(--line-2);margin:0 9px;border-radius:2px;transition:.25s;}
  .step-bar.filled{background:var(--ink-300);}

  /* ── Scroll body ── */
  .body{flex:1;overflow-y:auto;padding:14px 18px 18px;display:flex;flex-direction:column;gap:18px;}
  .body > *{flex-shrink:0;}  /* don't let flex collapse overflow:hidden children (e.g. accordion) */
  .body::-webkit-scrollbar{width:9px;}
  .body::-webkit-scrollbar-thumb{background:#e3d6c7;border-radius:9px;border:3px solid var(--paper);}

  .section-label{
    font-size:11px;font-weight:700;color:var(--ink-500);
    text-transform:uppercase;letter-spacing:.1em;margin-bottom:10px;
  }

  /* Intro */
  .intro{display:flex;flex-direction:column;gap:5px;}
  .intro h1{font-size:18px;font-weight:700;letter-spacing:-.02em;}
  .intro p{font-size:13px;color:var(--ink-700);line-height:1.55;display:block;}
  .intro .by{font-size:11px;color:var(--ink-400);margin-top:6px;display:block;}

  /* Accordion */
  .accordion{border:1px solid var(--line);border-radius:var(--r-md);overflow:hidden;background:var(--paper);}
  .acc-trigger{
    display:flex;align-items:center;justify-content:space-between;
    padding:13px 14px;cursor:pointer;user-select:none;background:var(--surface);
    transition:.15s;
  }
  .acc-trigger:hover{background:var(--surface-2);}
  .acc-left{display:flex;align-items:center;gap:9px;font-size:13px;font-weight:600;color:var(--ink-700);}
  .acc-left .ic{width:20px;height:20px;border-radius:6px;background:var(--orange-soft);color:var(--orange);
    display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .acc-chev{color:var(--ink-400);transition:transform .22s;display:flex;}
  .acc-chev.open{transform:rotate(90deg);}
  .acc-body{display:none;padding:14px;border-top:1px solid var(--line);background:var(--paper);}
  .acc-body.open{display:block;}
  .acc-body .explain{font-size:12.5px;color:var(--ink-700);line-height:1.65;margin-bottom:13px;}
  code.tok{font-family:"JetBrains Mono",monospace;font-size:11px;background:var(--surface-2);
    border:1px solid var(--line);padding:1px 5px;border-radius:5px;color:var(--orange-press);}

  .type-list{display:flex;flex-direction:column;gap:9px;}
  .type-row{display:flex;gap:11px;padding:12px;border-radius:var(--r-md);background:var(--surface);border:1px solid var(--line);}
  .type-row.skipped{opacity:.62;}
  .type-ic{width:26px;height:26px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;
    background:var(--paper);border:1px solid var(--line-2);font-size:13px;color:var(--ink-700);}
  .type-name{font-weight:700;font-size:13px;display:flex;align-items:center;gap:7px;margin-bottom:3px;}
  .type-code{font-family:"JetBrains Mono",monospace;font-size:9.5px;color:var(--orange-press);background:var(--paper);
    border:1px solid var(--line-2);padding:1px 5px;border-radius:4px;letter-spacing:.04em;}
  .type-desc{font-size:11.5px;color:var(--ink-500);line-height:1.5;margin-bottom:7px;}
  .type-ex{display:flex;flex-direction:column;gap:3px;}
  .ex{display:flex;align-items:center;gap:8px;font-size:10.5px;}
  .ex .plat{font-weight:700;width:54px;flex-shrink:0;}
  .ex .plat.web,.ex .plat.android,.ex .plat.ios{color:var(--ink-900);}
  .ex .val{font-family:"JetBrains Mono",monospace;color:var(--ink-700);}
  .skip-badge{font-size:9.5px;font-weight:700;padding:2px 7px;background:var(--surface-2);
    border:1px solid var(--line-2);color:var(--ink-900);border-radius:20px;text-transform:uppercase;letter-spacing:.05em;}

  /* Chips — unified for platforms + variable types, 2 columns */
  .chip-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
  .chip{
    display:flex;align-items:center;justify-content:center;gap:9px;
    padding:11px 8px;border:1.5px solid var(--ink-300);border-radius:11px;
    font-size:13px;font-weight:600;cursor:pointer;user-select:none;
    color:var(--ink-400);background:var(--paper);transition:.15s;letter-spacing:-.01em;
  }
  .chip:hover{border-color:var(--ink-300);color:var(--ink-700);}
  .chip svg{width:16px;height:16px;flex-shrink:0;}
  .chip .chip-dot{display:none;}
  /* active = black outline + semi-transparent fill */
  .chip.on{border-color:var(--ink-900);background:var(--chip-on-bg);color:var(--ink-900);}

  .divider{height:1px;background:var(--line);}

  /* Collections */
  .sa-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
  .select-all{font-size:12px;color:var(--orange);cursor:pointer;font-weight:600;padding:3px 8px;border-radius:6px;transition:.15s;}
  .select-all:hover{background:var(--orange-soft);}
  .collections{display:flex;flex-direction:column;gap:9px;}
  .col-item{
    display:flex;align-items:center;gap:12px;padding:0 14px;
    height:52px;box-sizing:border-box;
    border:1.5px solid var(--line);border-radius:var(--r-md);cursor:pointer;user-select:none;
    transition:.14s;background:var(--paper);
  }
  .col-item:hover{border-color:var(--line-2);background:var(--surface);}
  .col-item.sel{border-color:var(--ink-900);background:var(--sel-fill);box-shadow:0 6px 16px -12px rgba(31,24,21,.4);}
  .cb{width:20px;height:20px;border-radius:6px;border:1.5px solid var(--line-2);background:var(--paper);
    display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:.14s;}
  .col-item.sel .cb{background:var(--ink-900);border-color:var(--ink-900);}
  .cb svg{display:none;}.col-item.sel .cb svg{display:block;}
  .col-name{font-weight:600;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .col-count{font-size:12px;color:var(--ink-400);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .col-meta{flex:1;min-width:0;}
  .col-chip{font-family:"JetBrains Mono",monospace;font-size:10px;color:var(--orange);
    background:var(--surface-2);border:1px solid var(--line);padding:3px 7px;border-radius:6px;flex-shrink:0;}
  .col-item.sel .col-chip{color:var(--orange-press);}

  .notice{
    padding:12px 14px;background:var(--orange-soft);border:1.5px solid var(--orange-soft-bd);
    border-radius:var(--r-md);font-size:12.5px;color:var(--orange-press);line-height:1.5;
    display:none;align-items:flex-start;gap:9px;
  }
  .notice.show{display:flex;}
  .notice svg{flex-shrink:0;margin-top:1px;}

  .content{flex:1;position:relative;overflow:hidden;display:flex;flex-direction:column;}

  /* ── Overlays (preview / log) ── */
  .overlay{position:absolute;inset:0;background:var(--paper);z-index:5;
    display:none;flex-direction:column;}
  .overlay.open{display:flex;}
  .ov-head{padding:16px 18px 14px;border-bottom:1px solid var(--line);flex-shrink:0;}
  .ov-head h2{font-size:16px;font-weight:700;letter-spacing:-.02em;}
  .ov-head p{font-size:12.5px;color:var(--ink-500);margin-top:2px;}
  .ov-scroll{flex:1;overflow-y:auto;padding:14px 18px 16px;}
  .ov-scroll::-webkit-scrollbar{width:9px;}
  .ov-scroll::-webkit-scrollbar-thumb{background:#e3d6c7;border-radius:9px;border:3px solid var(--paper);}

  .warn-banner{
    margin:12px 18px 0;padding:12px 14px;background:var(--orange-soft);
    border:1.5px solid var(--orange-soft-bd);border-radius:var(--r-md);
    font-size:12px;color:var(--orange-press);display:none;flex-shrink:0;line-height:1.5;
  }
  .warn-banner.show{display:block;}
  .warn-banner strong{display:block;margin-bottom:2px;}

  .pv-group{margin-bottom:18px;}
  .pv-group-head{
    display:flex;align-items:center;gap:7px;cursor:pointer;user-select:none;
    font-size:11px;font-weight:700;color:var(--ink-500);text-transform:uppercase;letter-spacing:.08em;
    padding-bottom:8px;margin-bottom:4px;border-bottom:1px solid var(--line);transition:color .15s;
  }
  .pv-group-head:hover{color:var(--ink-700);}
  .pv-gh-chev{display:flex;color:var(--ink-400);transition:transform .2s;}
  .pv-group.collapsed .pv-gh-chev{transform:rotate(-90deg);}
  .pv-gh-name{flex:1;}
  .pv-group-head .ct{color:var(--ink-400);font-weight:600;letter-spacing:0;text-transform:none;font-size:11px;}
  .pv-group.collapsed .pv-items{display:none;}
  .pv-item{padding:6px 0;border-bottom:1px solid var(--surface-2);}
  .pv-top{display:flex;align-items:center;gap:8px;margin-bottom:4px;}
  .pv-name{font-size:12px;font-weight:600;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0;}
  .badge{font-size:9.5px;font-weight:700;padding:3px 7px;border-radius:5px;flex-shrink:0;
    text-transform:uppercase;letter-spacing:.04em;}
  .badge.COLOR,.badge.FLOAT,.badge.STRING{background:var(--surface-2);color:var(--ink-700);border:1px solid var(--line-2);}
  .pv-plats{display:flex;flex-direction:column;gap:2px;padding-left:2px;}
  .pv-prow{display:flex;align-items:center;gap:9px;}
  .pv-tag{font-size:10px;font-weight:700;width:54px;flex-shrink:0;}
  .pv-tag.web,.pv-tag.android,.pv-tag.ios{color:var(--ink-700);}
  .pv-css{font-family:"JetBrains Mono",monospace;font-size:10.5px;color:var(--orange);white-space:nowrap;
    background:none;border:none;padding:0;border-radius:0;}

  /* Log */
  .log-list{flex:1;overflow-y:auto;overflow-x:auto;padding:12px 18px;display:flex;flex-direction:column;gap:1px;}
  .log-list::-webkit-scrollbar{width:9px;height:9px;}
  .log-list::-webkit-scrollbar-thumb{background:#e3d6c7;border-radius:9px;border:3px solid var(--paper);}
  .log-item{font-size:10.5px;display:flex;gap:9px;align-items:center;padding:4px 6px;border-radius:6px;
    animation:logIn .25s ease both;min-width:100%;width:max-content;}
  .log-item:nth-child(even){background:var(--surface);}
  @keyframes logIn{from{opacity:0;transform:translateY(3px);}to{opacity:1;transform:none;}}
  .log-ic{width:16px;height:16px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;
    font-size:10px;font-weight:700;}
  .log-ic.ok{background:var(--orange-soft);color:var(--orange);}
  .log-ic.skip{background:var(--surface-2);color:var(--ink-400);}
  .log-name{font-family:"JetBrains Mono",monospace;color:var(--ink-500);flex:0 0 auto;white-space:nowrap;}
  .log-val{font-family:"JetBrains Mono",monospace;color:var(--orange);white-space:nowrap;flex-shrink:0;font-weight:500;}
  .log-val.skip{color:var(--ink-400);}

  .done-msg{margin:0 18px 14px;padding:14px;border-radius:var(--r-md);font-size:13px;font-weight:600;
    display:none;align-items:center;gap:10px;flex-shrink:0;}
  .done-msg.show{display:flex;}
  .done-msg.ok{background:var(--surface);color:var(--ink-900);border:1.5px solid var(--line-2);}
  .done-ic{width:24px;height:24px;border-radius:50%;background:var(--ink-900);color:#fff;
    display:flex;align-items:center;justify-content:center;flex-shrink:0;}

  /* Footer */
  .footer{flex-shrink:0;padding:14px 18px 18px;border-top:1px solid var(--line);
    display:flex;gap:11px;background:var(--paper);z-index:6;position:relative;}
  .btn{flex:1;padding:14px 16px;border-radius:var(--r-md);font-size:14px;font-weight:700;cursor:pointer;
    border:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;line-height:1;
    letter-spacing:-.01em;transition:.15s;font-family:inherit;}
  .btn:disabled{opacity:.4;cursor:not-allowed;box-shadow:none;}
  .btn-primary{background:var(--btn-bg);color:var(--btn-fg);box-shadow:var(--shadow-btn);}
  .btn-primary:hover:not(:disabled){background:var(--btn-bg-hover);}
  .btn-primary:active:not(:disabled){background:var(--btn-bg-press);transform:translateY(1px);}
  .btn-secondary{flex:0 0 auto;padding-left:18px;padding-right:18px;background:var(--surface-2);color:var(--ink-700);}
  .btn-secondary:hover:not(:disabled){background:var(--line);}
  .btn svg{flex-shrink:0;}
  .empty{padding:28px 0;text-align:center;color:var(--ink-300);font-size:12px;}
  .pv-more{display:block;width:100%;margin:10px 0 2px;padding:9px 12px;border:1px solid var(--line-2);
    border-radius:9px;background:var(--surface);color:var(--orange);font-family:inherit;font-size:12px;
    font-weight:700;cursor:pointer;transition:.15s;letter-spacing:.01em;}
  .pv-more:hover{background:var(--orange-soft);border-color:var(--orange-soft-bd);}

  /* ── Meta footer ── */
  .metabar{flex-shrink:0;display:flex;align-items:center;justify-content:space-between;
    padding:10px 18px;border-top:1px solid var(--line);background:var(--surface);}
  .metabar .ver{display:flex;align-items:center;gap:8px;font-size:11.5px;font-weight:600;color:var(--ink-500);letter-spacing:.01em;white-space:nowrap;}
  .metabar .badge-new{font-size:9px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;
    color:var(--orange);background:var(--orange-soft);border:1px solid var(--orange-soft-bd);padding:2px 7px;border-radius:20px;}
  .metabar .fb{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:var(--orange);
    cursor:pointer;padding:4px 8px;border-radius:7px;transition:.15s;white-space:nowrap;}
  .metabar .fb:hover{background:var(--orange-soft);}
  .metabar .fb svg{flex-shrink:0;}
  .metabar .meta-icon{display:flex;align-items:center;justify-content:center;width:34px;height:34px;
    border-radius:9px;border:none;background:transparent;color:var(--ink-400);
    cursor:pointer;transition:.15s;flex-shrink:0;padding:0;}
  .metabar .meta-icon:hover{color:var(--orange);background:var(--orange-soft);}

  /* ── Contact page ── */
  .info-icon{width:46px;height:46px;border-radius:13px;background:var(--orange-soft);color:var(--orange);
    border:1px solid var(--orange-soft-bd);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .contact-page{position:absolute;inset:52px 0 0;background:var(--paper);z-index:20;
    display:none;flex-direction:column;}
  .contact-page.open{display:flex;}
  .contact-scroll{flex:1;overflow-y:auto;padding:28px 22px 20px;position:relative;display:flex;flex-direction:column;}
  .contact-scroll::-webkit-scrollbar{width:9px;}
  .contact-scroll::-webkit-scrollbar-thumb{background:#e3d6c7;border-radius:9px;border:3px solid var(--paper);}
  .contact-deco{position:absolute;top:20px;right:20px;display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
  .contact-deco span{width:7px;height:7px;border-radius:2px;background:var(--orange);opacity:.55;}
  .contact-deco span:nth-child(3n+2){opacity:.32;}
  .wave{font-size:32px;line-height:1;margin:20px 0 6px;}
  .c-title{font-size:23px;font-weight:700;letter-spacing:-.02em;margin:20px 0 12px;}
  .c-text{font-size:13.5px;color:var(--ink-700);line-height:1.62;margin-bottom:13px;}
  .c-text b{font-weight:700;color:var(--ink-900);}
  .c-links{display:flex;flex-direction:column;gap:9px;margin:20px 0 24px;}
  .c-link{display:flex;align-items:center;gap:12px;padding:12px 14px;border:1.5px solid var(--line);
    border-radius:12px;font-size:13.5px;font-weight:600;color:var(--ink-900);text-decoration:none;
    background:var(--paper);transition:.15s;}
  .c-link:hover{border-color:var(--ink-300);background:var(--surface);}
  .c-link .ci{width:32px;height:32px;border-radius:9px;background:var(--orange-soft);color:var(--orange);
    display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .c-link .arrow{margin-left:auto;color:var(--ink-400);display:flex;}
  .c-link.coffee{border-color:var(--orange-soft-bd);background:var(--orange-tint);}
  .c-link.coffee .ci{background:var(--orange);color:#fff;}
  .c-contact{margin:16px 0 40px;}
  .c-inline{color:var(--orange);font-weight:600;text-decoration:none;
    border-bottom:1.5px solid var(--orange-soft-bd);white-space:nowrap;transition:.15s;}
  .c-inline:hover{border-bottom-color:var(--orange);}
  .c-inline svg{width:13px;height:13px;vertical-align:-1.5px;margin-right:3px;}
  .c-author{display:flex;align-items:center;gap:12px;margin-top:28px;padding-top:20px;border-top:1px solid var(--line);}
  .c-avatar{width:46px;height:46px;border-radius:50%;background:var(--orange-soft);color:var(--orange);
    display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px;flex-shrink:0;
    border:1px solid var(--orange-soft-bd);letter-spacing:.02em;}
  .c-name{font-weight:700;font-size:14px;}
  .c-author image-slot{width:46px;height:46px;flex-shrink:0;border:1px solid var(--orange-soft-bd);border-radius:50%;}
  .c-role{font-size:12px;color:var(--ink-500);margin-top:1px;}

  /* ── Multi-screen stage ── */
  .theme-toggle{display:inline-flex;background:rgba(255,255,255,.55);border:1px solid var(--line-2);
    border-radius:999px;padding:4px;gap:2px;backdrop-filter:blur(6px);}
  .theme-toggle button{border:none;background:transparent;font-family:inherit;font-size:12px;font-weight:600;
    color:var(--ink-500);padding:7px 16px;border-radius:999px;cursor:pointer;display:flex;align-items:center;gap:6px;transition:.15s;}
  .theme-toggle button:hover{color:var(--ink-700);}
  .theme-toggle button.active{background:var(--paper);color:var(--ink-900);box-shadow:0 2px 8px -3px rgba(0,0,0,.25);}
  .theme-toggle svg{width:14px;height:14px;}
  .stage-row{display:flex;gap:34px;align-items:flex-start;flex-wrap:wrap;justify-content:center;}
  .frame{display:flex;flex-direction:column;align-items:center;gap:14px;}
  .cap{font-size:12px;font-weight:600;letter-spacing:.02em;color:var(--ink-500);display:flex;align-items:center;gap:9px;}
  .cap .tag{font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;padding:3px 9px;
    border-radius:999px;background:var(--orange-soft);color:var(--orange);border:1px solid var(--orange-soft-bd);}

  /* ── Checkbox option rows (concept screen) ── */
  .opt-list{display:flex;flex-direction:column;gap:9px;}
  .opt-row{display:flex;align-items:center;gap:12px;padding:12px 14px;border:1.5px solid var(--line);
    border-radius:var(--r-md);cursor:pointer;user-select:none;background:var(--paper);transition:.14s;}
  .opt-row:hover{border-color:var(--line-2);background:var(--surface);}
  .opt-row.sel{border-color:var(--ink-900);background:var(--sel-fill);box-shadow:0 6px 16px -12px rgba(31,24,21,.4);}
  .opt-cb{width:20px;height:20px;border-radius:6px;border:1.5px solid var(--line-2);background:var(--paper);
    display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:.14s;}
  .opt-cb svg{display:none;}
  .opt-row.sel .opt-cb,.type-opt.sel .opt-cb{background:var(--ink-900);border-color:var(--ink-900);}
  .opt-row.sel .opt-cb svg,.type-opt.sel .opt-cb svg{display:block;}
  .opt-ic{width:26px;height:26px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:var(--ink-500);}
  .opt-ic.web{color:var(--web);}.opt-ic.android{color:var(--android);}.opt-ic.ios{color:var(--ios);}
  .opt-name{font-weight:600;font-size:14px;color:var(--ink-900);}
  .opt-row:not(.sel) .opt-name,.type-opt:not(.sel) .opt-name{color:var(--ink-500);}

  .type-opt{border:1.5px solid var(--line);border-radius:var(--r-md);background:var(--paper);transition:.14s;overflow:hidden;}
  .type-opt.sel{border-color:var(--ink-900);box-shadow:0 6px 16px -12px rgba(31,24,21,.4);}
  .type-opt-head{display:flex;align-items:center;gap:12px;padding:12px 14px;cursor:pointer;user-select:none;}
  .type-opt.sel .type-opt-head{background:var(--sel-fill);}
  .type-opt-ex{padding:11px 14px 12px 48px;display:flex;flex-direction:column;gap:6px;
    border-top:1px solid var(--line);background:var(--surface);}
  .type-opt:not(.sel) .type-opt-ex{display:none;}
  .tex-row{display:flex;align-items:center;gap:10px;font-size:11px;transition:opacity .15s;}
  .tex-row.dim{opacity:.3;}
  .tex-plat{width:58px;flex-shrink:0;font-weight:700;color:var(--ink-500);}
  .tex-val{font-family:"JetBrains Mono",monospace;color:var(--orange);white-space:nowrap;}
</style>
<style>
  /* ── Figma plugin iframe overrides ── */
  html, body { height: 100%; }
  body { margin: 0; padding: 0; gap: 0; display: block; min-height: 100%; background: var(--paper); }
  .window { width: 100%; height: 100vh; border: 0; border-radius: 0; box-shadow: none; }
  [data-theme="dark"] body { background: var(--paper); }
  /* no custom title bar anymore -> overlay pages cover from the very top */
  .contact-page { inset: 0; }
  /* Daria's photo avatar (replaces the initials placeholder) */
  img.c-avatar { object-fit: cover; padding: 0; }
  /* error rows in the apply log */
  .log-ic.err { background: #f7ddd2; color: var(--orange-press); }
  .log-val.err { color: var(--orange-press); }
  [data-theme="dark"] .log-ic.err { background: #4a2418; color: var(--orange); }
  /* warning variant of the done banner */
  .done-msg.warn { background: var(--orange-soft); border: 1.5px solid var(--orange-soft-bd); color: var(--orange-press); }
  .done-msg.warn .done-ic { background: var(--orange); }

  /* ── Neutralized palette: warm creams/browns -> neutral greys. Orange accent unchanged. ── */
  :root{
    --ink-900:#1A1A1A; --ink-700:#4D4D4D; --ink-500:#808080; --ink-400:#A3A3A3; --ink-300:#C7C7C7;
    --ink-950:#0D0D0D;
    --paper:#FFFFFF; --surface:#F5F5F5; --surface-2:#EBEBEB; --line:#E6E6E6; --line-2:#D6D6D6;
    --sel-fill:rgba(0,0,0,.05); --chip-on-bg:rgba(0,0,0,.055);
    --shadow-btn:0 1px 0 rgba(0,0,0,.04), 0 8px 18px -10px rgba(0,0,0,.35);
  }
  [data-theme="dark"]{
    --ink-900:#EDEDED; --ink-700:#C7C7C7; --ink-500:#9A9A9A; --ink-400:#7A7A7A; --ink-300:#5C5C5C;
    --ink-950:#FFFFFF;
    --paper:#2C2C2C; --surface:#383838; --surface-2:#404040; --line:#3D3D3D; --line-2:#4A4A4A;
    --sel-fill:rgba(255,255,255,.07); --chip-on-bg:rgba(255,255,255,.08);
    --btn-bg:#EDEDED; --btn-bg-hover:#FFFFFF; --btn-bg-press:#D6D6D6; --btn-fg:#2C2C2C;
    --shadow-btn:0 1px 0 rgba(0,0,0,.2), 0 8px 18px -10px rgba(0,0,0,.6);
  }
  /* neutral scrollbars (were warm tan) */
  .body::-webkit-scrollbar-thumb, .ov-scroll::-webkit-scrollbar-thumb,
  .log-list::-webkit-scrollbar-thumb, .contact-scroll::-webkit-scrollbar-thumb { background:#D6D6D6; border-color:var(--paper); }
  [data-theme="dark"] .body::-webkit-scrollbar-thumb, [data-theme="dark"] .ov-scroll::-webkit-scrollbar-thumb,
  [data-theme="dark"] .log-list::-webkit-scrollbar-thumb, [data-theme="dark"] .contact-scroll::-webkit-scrollbar-thumb { background:#4A4A4A; border-color:var(--paper); }
  /* neutral selection shadow (was warm) */
  .col-item.sel { box-shadow:0 6px 16px -12px rgba(0,0,0,.28); }
  /* selected checkboxes: neutral & consistent in both themes */
  [data-theme="dark"] .col-item.sel .cb { background:var(--ink-900); border-color:var(--ink-900); }
  .col-item.sel .cb svg { stroke:var(--paper); }
  /* completion icon: orange circle + white glyph + soft orange glow — matches the active step dot */
  .done-ic { background:var(--orange); box-shadow:0 4px 10px -3px rgba(232,85,45,.45); }
  [data-theme="dark"] .done-ic { background:var(--orange); }
  .done-ic svg { stroke:#fff; }
  .done-msg.warn .done-ic svg { stroke:#fff; }

  /* a bit more breathing room under the Select / Preview / Apply stepper (all screens) */
  .steps { padding-bottom: 18px; }

  /* hovering a section (chips/list + its label) gently highlights the label,
     mirroring the collection-header hover on the Preview / Apply screens */
  .section-label { transition: color .15s ease; }
  .sec-hl:hover .section-label { color: var(--ink-700); }
</style>
</head>
<body>

<div class="window" id="win">
  <!-- Step indicator -->
  <div class="steps" id="steps">
    <div class="step active" data-step="1"><div class="step-dot" style="border-width: 1px">1</div><div class="step-name">Select</div></div>
    <div class="step-bar" id="bar1" style="height: 1px"></div>
    <div class="step" data-step="2"><div class="step-dot" style="border-width: 1px">2</div><div class="step-name">Preview</div></div>
    <div class="step-bar" id="bar2" style="height: 1px"></div>
    <div class="step" data-step="3"><div class="step-dot" style="border-width: 1px">3</div><div class="step-name">Apply</div></div>
  </div>

  <div class="content">

  <!-- ── Main body ── -->
  <div class="body" id="mainBody" style="padding: 20px 18px 18px">

    <!-- Platforms -->
    <div class="sec-hl">
      <div class="section-label">Platforms</div>
      <div class="chip-grid" id="platforms">
        <div class="chip on" data-p="WEB" onclick="togglePlat('WEB')" style="padding: 8px; height: 36px; text-align: justify; border-width: 1px; gap: 6px">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5" style="stroke-width: 1.5px"/><line x1="2.5" y1="12" x2="21.5" y2="12"/><path d="M12 2.5a14 14 0 0 1 3.8 9.5 14 14 0 0 1-3.8 9.5 14 14 0 0 1-3.8-9.5A14 14 0 0 1 12 2.5z" style="stroke-width: 1.5px"/></svg>
          <span>Web</span><span class="chip-dot"></span>
        </div>
        <div class="chip" data-p="ANDROID" onclick="togglePlat('ANDROID')" style="height: 36px; border-width: 1px; gap: 6px">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6.18 9.75A5.81 5.81 0 0 1 12 4.5a5.81 5.81 0 0 1 5.82 5.25H6.18zM3.75 10.5a.75.75 0 0 0-.75.75v5.25a.75.75 0 0 0 1.5 0V11.25a.75.75 0 0 0-.75-.75zm16.5 0a.75.75 0 0 0-.75.75v5.25a.75.75 0 0 0 1.5 0V11.25a.75.75 0 0 0-.75-.75zM6 10.5h12a.75.75 0 0 1 .75.75v7.5A1.5 1.5 0 0 1 17.25 20h-1.5v2.25a.75.75 0 0 1-1.5 0V20h-4.5v2.25a.75.75 0 0 1-1.5 0V20h-1.5A1.5 1.5 0 0 1 5.25 18.75v-7.5A.75.75 0 0 1 6 10.5zm.55-6.09 1.5-2.6a.375.375 0 0 1 .65.376l-1.5 2.598a.375.375 0 1 1-.65-.374zm9.9 0a.375.375 0 0 1-.65.374l-1.5-2.598a.375.375 0 0 1 .65-.375l1.5 2.6z"/></svg>
          <span>Android</span><span class="chip-dot"></span>
        </div>
        <div class="chip" data-p="IOS" onclick="togglePlat('IOS')" style="height: 36px; border-width: 1px; gap: 6px">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
          <span>iOS</span><span class="chip-dot"></span>
        </div>
      </div>
    </div>

    <!-- Types -->
    <div class="sec-hl">
      <div class="section-label">Variable types</div>
      <div class="chip-grid" id="types">
        <div class="chip on" data-t="COLOR" onclick="toggleType('COLOR')" style="height: 36px; border-width: 1px; gap: 6px">
          <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" stroke-width="1.4" style="stroke-width: 1px; fill: none"/></svg>
          <span>Color</span><span class="chip-dot"></span>
        </div>
        <div class="chip on" data-t="FLOAT" onclick="toggleType('FLOAT')" style="height: 36px; border-width: 1px; gap: 6px">
          <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="2.5" y1="4.5" x2="11.5" y2="4.5" style="stroke-width: 1.5px"/><line x1="2.5" y1="9.5" x2="11.5" y2="9.5" style="stroke-width: 1.5px"/><line x1="5.5" y1="1.5" x2="4.5" y2="12.5" style="stroke-width: 1.5px"/><line x1="9.5" y1="1.5" x2="8.5" y2="12.5" style="stroke-width: 1.5px"/></svg>
          <span>Number</span><span class="chip-dot"></span>
        </div>
        <div class="chip on" data-t="STRING" onclick="toggleType('STRING')" style="height: 36px; border-width: 1px; gap: 6px">
          <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M2.5 3.5h9M7 3.5V11.5" style="stroke-width: 1.5px"/></svg>
          <span style="font-weight: 600">String</span><span class="chip-dot"></span>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <!-- Collections -->
    <div class="sec-hl">
      <div class="sa-row">
        <div class="section-label" style="margin-bottom: 0">Collections</div>
        <div class="select-all" id="selectAll" onclick="toggleAll()">Select all</div>
      </div>
      <div class="notice" id="notice">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18.4A2 2 0 0 0 3.5 21.4h17a2 2 0 0 0 1.7-3l-8.5-14.5a2 2 0 0 0-3.4 0z"/></svg>
        <span>Select at least one platform and one variable type to continue.</span>
      </div>
      <div class="collections" id="collections"></div>
    </div>

  </div>

  <!-- ── Preview overlay ── -->
  <div class="overlay" id="previewOv">
    <div class="ov-head">
      <h2>Preview changes</h2>
      <p id="previewSub">Review before applying</p>
    </div>
    <div class="warn-banner" id="warnBanner"></div>
    <div class="ov-scroll" id="previewScroll"></div>
  </div>

  <!-- ── Log overlay ── -->
  <div class="overlay" id="logOv">
    <div class="ov-head"><h2 id="logTitle">Applying…</h2><p id="logSub">Writing code syntax to your variables</p></div>
    <div class="log-list" id="logList"></div>
    <div class="done-msg" id="doneMsg"></div>
  </div>

  </div><!-- /content -->

  <!-- Footer -->
  <div class="footer">
    <button class="btn btn-secondary" id="btnBack" onclick="goBack()" style="display:none">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>Back
    </button>
    <button class="btn btn-primary" id="btnMain" disabled>
      <span id="btnLabel">Preview</span>
      <svg id="btnIcon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
  </div>

  <!-- Meta footer -->
  <div class="metabar" id="metabar">
    <div style="display:flex;align-items:center;gap:2px;">
      <button class="meta-icon" onclick="openInfo()" aria-label="How it works & supported types" title="How it works & supported types">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16.5"/><line x1="12" y1="7.5" x2="12.01" y2="7.5"/></svg>
      </button>
      <button class="meta-icon" id="themeToggle" aria-label="Switch light / dark theme" title="Switch theme"></button>
    </div>
    <span class="fb" onclick="openContact()">Feedback &amp; ideas
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </span>
  </div>

  <!-- Contact page -->
  <div class="contact-page" id="contactPage">
    <div class="contact-scroll">
      <div class="contact-deco"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
      <div class="wave" style="margin: 0px 0px 6px">👋</div>
      <div class="c-title">Oh, hey!</div>
      <p class="c-text" style="margin: 2px 0px 13px">Thanks for using <b>Set Code Syntax</b> — I hope it’s saving you time wiring up code syntax for your design tokens across Web, Android &amp; iOS.</p>
      <p class="c-text">If you have any ideas for features or perhaps ways to improve the plugin, I would love to hear from you.</p>
      <p class="c-text c-contact">Feel free to shoot me an <a class="c-inline" href="mailto:zoriadaria@gmail.com"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>email</a>, send me a <a class="c-inline" href="https://www.linkedin.com/in/dariazoria" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>message</a>, or <a class="c-inline" href="https://buymeacoffee.com/zoriadariay" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>buy me a coffee</a>.</p>
      <div class="c-author" style="border-style: none; margin: 0px; padding: 0px">
        <img class="c-avatar" src="data:image/jpeg;base64,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" alt="Daria Zoria" width="46" height="46">
        <div><div class="c-name">Daria Zoria</div><div class="c-role">UX/UI Designer</div></div>
      </div>
    </div>
    <div class="footer">
      <button class="btn btn-secondary" style="flex:1" onclick="closeContact()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>Back to plugin
      </button>
    </div>
  </div>

  <!-- Info page (How it works & supported types) -->
  <div class="contact-page" id="infoPage">
    <div class="contact-scroll">
      <div class="info-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16.5"/><line x1="12" y1="7.5" x2="12.01" y2="7.5"/></svg></div>
      <div class="c-title" style="margin:14px 0 12px">How it works</div>
      <p class="c-text">Set Code Syntax reads your variable names and converts them to each platform’s naming convention. <code class="tok">color/grey/50</code> becomes <code class="tok">--color-grey-50</code> (Web), <code class="tok">color_grey_50</code> (Android), and <code class="tok">colorGrey50</code> (iOS). Spaces and invalid characters are cleaned automatically.</p>
      <div class="section-label" style="margin:22px 0 12px">Supported types</div>
      <div class="type-list">
        <div class="type-row">
          <div class="type-ic"><svg width="13" height="13" viewBox="0 0 14 14"><circle cx="7" cy="7" r="5" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="1.4"/></svg></div>
          <div>
            <div class="type-name">Color <span class="type-code">COLOR</span></div>
            <div class="type-desc">Color values — backgrounds, text, borders, icons.</div>
            <div class="type-ex">
              <div class="ex"><span class="plat web">Web</span><span class="val">--color-brand-primary</span></div>
              <div class="ex"><span class="plat android">Android</span><span class="val">color_brand_primary</span></div>
              <div class="ex"><span class="plat ios">iOS</span><span class="val">colorBrandPrimary</span></div>
            </div>
          </div>
        </div>
        <div class="type-row">
          <div class="type-ic"><svg width="13" height="13" viewBox="0 0 14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="2.5" y1="4.5" x2="11.5" y2="4.5"/><line x1="2.5" y1="9.5" x2="11.5" y2="9.5"/><line x1="5.5" y1="1.5" x2="4.5" y2="12.5"/><line x1="9.5" y1="1.5" x2="8.5" y2="12.5"/></svg></div>
          <div>
            <div class="type-name">Number <span class="type-code">FLOAT</span></div>
            <div class="type-desc">Numeric values — spacing, sizing, radius, opacity, font sizes.</div>
            <div class="type-ex">
              <div class="ex"><span class="plat web">Web</span><span class="val">--spacing-4</span></div>
              <div class="ex"><span class="plat android">Android</span><span class="val">spacing_4</span></div>
              <div class="ex"><span class="plat ios">iOS</span><span class="val">spacing4</span></div>
            </div>
          </div>
        </div>
        <div class="type-row">
          <div class="type-ic"><svg width="13" height="13" viewBox="0 0 14 14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M2.5 3.5h9M7 3.5V11.5"/></svg></div>
          <div>
            <div class="type-name">String <span class="type-code">STRING</span></div>
            <div class="type-desc">Text values — font families, content strings.</div>
            <div class="type-ex">
              <div class="ex"><span class="plat web">Web</span><span class="val">--font-family-sans</span></div>
              <div class="ex"><span class="plat android">Android</span><span class="val">font_family_sans</span></div>
              <div class="ex"><span class="plat ios">iOS</span><span class="val">fontFamilySans</span></div>
            </div>
          </div>
        </div>
        <div class="type-row skipped">
          <div class="type-ic"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="10" rx="5"/><circle cx="8" cy="12" r="2.4" fill="currentColor" stroke="none"/></svg></div>
          <div>
            <div class="type-name">Boolean <span class="type-code">BOOLEAN</span> <span class="skip-badge">Skipped</span></div>
            <div class="type-desc">True/false values used to show or hide elements. Not a CSS or platform token — skipped automatically.</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <button class="btn btn-secondary" style="flex:1" onclick="closeInfo()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>Back to plugin
      </button>
    </div>
  </div>

</div>

<script>
(function(){
  var PLABEL  = { WEB:'Web', ANDROID:'Android', IOS:'iOS' };
  var PCLASS  = { WEB:'web', ANDROID:'android', IOS:'ios' };
  var TYPELBL = { COLOR:'color', FLOAT:'number', STRING:'string' };

  var selected   = new Set();
  var allIds     = [];
  var activePlat = new Set(['WEB']);
  var activeType = new Set(['COLOR','FLOAT','STRING']);
  var step       = 'main';

  var $ = function(id){ return document.getElementById(id); };
  var btnMain = $('btnMain'), btnBack = $('btnBack'), btnLabel = $('btnLabel'), btnIcon = $('btnIcon');

  var CHEV    = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
  var CHECK   = '<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  var XICON   = '<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>';
  var CBCHECK = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  var DONEOK  = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  var DONEWARN= '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18.4A2 2 0 0 0 3.5 21.4h17a2 2 0 0 0 1.7-3l-8.5-14.5a2 2 0 0 0-3.4 0z"/></svg>';

  /* ── Theme: follow Figma automatically, but let the user override via the toggle ── */
  var SUN  = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2M12 19.5v2M4.5 4.5l1.4 1.4M18.1 18.1l1.4 1.4M2.5 12h2M19.5 12h2M4.5 19.5l1.4-1.4M18.1 5.9l1.4-1.4"/></svg>';
  var MOON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4 7 7 0 1 0 20 14.5z"/></svg>';
  var themeManual = false;
  var themeBtn = document.getElementById('themeToggle');

  function figmaIsDark(){
    return document.documentElement.classList.contains('figma-dark') || document.body.classList.contains('figma-dark');
  }
  function setTheme(t){
    document.documentElement.setAttribute('data-theme', t);
    // show the icon for the mode you'd switch TO
    if(themeBtn){
      themeBtn.innerHTML = (t === 'dark') ? SUN : MOON;
      themeBtn.setAttribute('title', (t === 'dark') ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }
  function autoTheme(){ if(!themeManual) setTheme(figmaIsDark() ? 'dark' : 'light'); }

  autoTheme(); // apply the user's current Figma theme on start
  // keep following Figma until the user makes a manual choice
  new MutationObserver(autoTheme).observe(document.documentElement, { attributes:true, attributeFilter:['class'] });
  if(document.body) new MutationObserver(autoTheme).observe(document.body, { attributes:true, attributeFilter:['class'] });

  if(themeBtn){
    themeBtn.addEventListener('click', function(){
      themeManual = true; // stop auto-following once the user chooses
      var cur = document.documentElement.getAttribute('data-theme');
      setTheme(cur === 'dark' ? 'light' : 'dark');
    });
  }

  /* ── Step indicator + button state machine ── */
  function setSteps(active){
    var map = { main:1, preview:2, log:3 }, n = map[active];
    document.querySelectorAll('.step').forEach(function(s){
      var i = +s.dataset.step;
      s.className = 'step' + (i < n ? ' done' : i === n ? ' active' : '');
    });
    $('bar1').className = 'step-bar' + (n > 1 ? ' filled' : '');
    $('bar2').className = 'step-bar' + (n > 2 ? ' filled' : '');
  }
  function setStep(s){
    step = s; setSteps(s);
    $('previewOv').className = 'overlay' + (s === 'preview' ? ' open' : '');
    $('logOv').className     = 'overlay' + (s === 'log'     ? ' open' : '');
    if(s === 'main'){
      btnBack.style.display = 'none';
      btnLabel.textContent = 'Preview'; btnIcon.style.display = '';
      btnIcon.innerHTML = '<polyline points="9 18 15 12 9 6"/>';
      updateBtn();
    } else if(s === 'preview'){
      btnBack.style.display = 'inline-flex';
      btnLabel.textContent = 'Apply'; btnIcon.style.display = '';
      btnIcon.innerHTML = '<polyline points="20 6 9 17 4 12"/>';
      btnMain.disabled = false;
    } else if(s === 'log'){
      btnBack.style.display = 'none';
      btnLabel.textContent = 'Applying\u2026'; btnIcon.style.display = 'none';
      btnMain.disabled = true;
    }
  }
  window.goBack = function(){ setStep('main'); };

  function updateBtn(){
    if(step !== 'main') return;
    var ok = selected.size > 0 && activePlat.size > 0 && activeType.size > 0;
    btnMain.disabled = !ok;
    $('notice').className = 'notice' + ((selected.size > 0) && (activePlat.size === 0 || activeType.size === 0) ? ' show' : '');
  }

  /* ── Collections (real data from the plugin backend) ── */
  function renderCollections(list){
    var c = $('collections'); c.innerHTML = '';
    if(!list || !list.length){
      c.innerHTML = '<div class="empty">No variable collections found in this file.</div>';
      allIds = []; updateSelectAll(); return;
    }
    allIds = list.map(function(x){ return x.id; });
    list.forEach(function(col){
      var div = document.createElement('div');
      div.className = 'col-item' + (selected.has(col.id) ? ' sel' : '');
      div.dataset.id = col.id;
      div.onclick = function(){ toggleCol(col.id); };
      div.innerHTML =
        '<div class="cb">' + CBCHECK + '</div>' +
        '<div class="col-meta"><div class="col-name">' + col.name + '</div>' +
        '<div class="col-count">' + col.count + ' variable' + (col.count !== 1 ? 's' : '') + '</div></div>';
      c.appendChild(div);
    });
    updateSelectAll();
  }
  function toggleCol(id){
    if(selected.has(id)) selected.delete(id); else selected.add(id);
    var el = $('collections').querySelector('[data-id="' + id + '"]');
    if(el) el.classList.toggle('sel', selected.has(id));
    updateSelectAll(); updateBtn();
  }
  window.toggleAll = function(){
    if(allIds.length && selected.size === allIds.length) selected.clear();
    else allIds.forEach(function(id){ selected.add(id); });
    $('collections').querySelectorAll('.col-item').forEach(function(el){
      el.classList.toggle('sel', selected.has(el.dataset.id));
    });
    updateSelectAll(); updateBtn();
  };
  function updateSelectAll(){
    $('selectAll').textContent = (allIds.length && selected.size === allIds.length) ? 'Deselect all' : 'Select all';
  }

  /* ── Platform / type chips ── */
  window.togglePlat = function(p){
    var el = document.querySelector('[data-p="' + p + '"]');
    if(activePlat.has(p)){ if(activePlat.size === 1) return; activePlat.delete(p); el.classList.remove('on'); }
    else { activePlat.add(p); el.classList.add('on'); }
    updateBtn();
  };
  window.toggleType = function(t){
    var el = document.querySelector('[data-t="' + t + '"]');
    if(activeType.has(t)){ if(activeType.size === 1) return; activeType.delete(t); el.classList.remove('on'); }
    else { activeType.add(t); el.classList.add('on'); }
    updateBtn();
  };

  /* ── Info / contact pages ── */
  window.openInfo    = function(){ $('infoPage').classList.add('open'); };
  window.closeInfo   = function(){ $('infoPage').classList.remove('open'); };
  window.openContact = function(){ $('contactPage').classList.add('open'); };
  window.closeContact= function(){ $('contactPage').classList.remove('open'); };

  /* ── Preview (round-trips to the backend) ── */
  function requestPreview(){
    btnLabel.textContent = 'Loading\u2026'; btnIcon.style.display = 'none'; btnMain.disabled = true;
    parent.postMessage({ pluginMessage: {
      type: 'preview',
      selectedIds: Array.from(selected),
      platforms: Array.from(activePlat),
      types: Array.from(activeType)
    }}, '*');
  }
  function renderPreview(items, warnings){
    items = items || [];
    $('previewSub').textContent = items.length + ' variable' + (items.length !== 1 ? 's' : '') + ' will get Code Syntax';
    var wb = $('warnBanner');
    if(warnings && warnings.length){
      wb.className = 'warn-banner show';
      wb.innerHTML = '<strong>Some names will be auto-fixed</strong>' + warnings.length +
        ' name' + (warnings.length !== 1 ? 's' : '') + ' had spaces or special characters \u2014 cleaned automatically.';
    } else { wb.className = 'warn-banner'; wb.innerHTML = ''; }

    var groups = {};
    items.forEach(function(it){ (groups[it.collection] = groups[it.collection] || []).push(it); });
    var scroll = $('previewScroll'); scroll.innerHTML = '';

    function renderItem(it){
      var rows = Object.keys(it.platforms).map(function(p){
        return '<div class="pv-prow"><span class="pv-tag ' + PCLASS[p] + '">' + PLABEL[p] +
               '</span><span class="pv-css">' + it.platforms[p] + '</span></div>';
      }).join('');
      var d = document.createElement('div'); d.className = 'pv-item';
      d.innerHTML = '<div class="pv-top"><span class="badge ' + it.type + '">' +
        (TYPELBL[it.type] || it.type.toLowerCase()) + '</span><span class="pv-name">' + it.name +
        '</span></div><div class="pv-plats">' + rows + '</div>';
      return d;
    }

    Object.keys(groups).forEach(function(col){
      var arr = groups[col];
      var g = document.createElement('div'); g.className = 'pv-group';
      var head = document.createElement('div'); head.className = 'pv-group-head';
      head.innerHTML = '<span class="pv-gh-chev">' + CHEV + '</span><span class="pv-gh-name">' +
        col + '</span><span class="ct">' + arr.length + '</span>';
      var wrap = document.createElement('div'); wrap.className = 'pv-items';
      head.onclick = function(){ g.classList.toggle('collapsed'); };
      g.appendChild(head); g.appendChild(wrap);
      var CAP = 60;
      arr.slice(0, CAP).forEach(function(it){ wrap.appendChild(renderItem(it)); });
      if(arr.length > CAP){
        var more = document.createElement('button'); more.className = 'pv-more'; more.type = 'button';
        more.textContent = 'Show all ' + arr.length;
        more.onclick = function(){ arr.slice(CAP).forEach(function(it){ wrap.insertBefore(renderItem(it), more); }); more.remove(); };
        wrap.appendChild(more);
      }
      scroll.appendChild(g);
    });
    scroll.scrollTop = 0;
    setStep('preview');
  }

  /* ── Apply / streamed log ── */
  var logGroups = {}, logCounts = {};
  function logGroup(col){
    if(logGroups[col]) return logGroups[col];
    var g = document.createElement('div'); g.className = 'pv-group';
    var head = document.createElement('div'); head.className = 'pv-group-head';
    head.innerHTML = '<span class="pv-gh-chev">' + CHEV + '</span><span class="pv-gh-name">' +
      col + '</span><span class="ct">0</span>';
    var wrap = document.createElement('div'); wrap.className = 'pv-items';
    head.onclick = function(){ g.classList.toggle('collapsed'); };
    g.appendChild(head); g.appendChild(wrap);
    $('logList').appendChild(g);
    logGroups[col] = { wrap: wrap, ct: head.querySelector('.ct') };
    logCounts[col] = 0;
    return logGroups[col];
  }
  function runApply(){
    setStep('log');
    $('logTitle').textContent = 'Applying\u2026';
    $('logSub').textContent = 'Writing code syntax to your variables';
    $('doneMsg').className = 'done-msg';
    $('logList').innerHTML = ''; logGroups = {}; logCounts = {};
    parent.postMessage({ pluginMessage: {
      type: 'run',
      selectedIds: Array.from(selected),
      platforms: Array.from(activePlat),
      types: Array.from(activeType)
    }}, '*');
  }
  function appendLog(msg){
    var col = msg.collection || 'Variables';
    var grp = logGroup(col);
    logCounts[col]++; grp.ct.textContent = logCounts[col];
    var status = msg.status === 'ok' ? 'ok' : (msg.status === 'skip' ? 'skip' : 'err');
    var icon   = status === 'ok' ? CHECK : (status === 'skip' ? '\u2013' : XICON);
    var valCls = status === 'ok' ? '' : (status === 'skip' ? ' skip' : ' err');
    var d = document.createElement('div'); d.className = 'log-item';
    d.innerHTML = '<span class="log-ic ' + status + '">' + icon + '</span><span class="log-name">' +
      msg.name + '</span><span class="log-val' + valCls + '">' + msg.platforms + '</span>';
    grp.wrap.appendChild(d);
    var ll = $('logList'); ll.scrollTop = ll.scrollHeight;
  }
  function finishApply(d){
    d = d || {};
    var setN = d.set || 0, updated = d.updated || 0, alreadySet = d.alreadySet || 0, failed = d.failed || 0, skipped = d.skipped || 0;
    var nothing = !setN && !updated && !alreadySet && !failed;
    $('logTitle').textContent = 'Done';
    $('logSub').textContent = nothing ? 'No changes were applied' : 'Finished applying code syntax';
    var parts = [];
    if(setN)       parts.push(setN + ' set');
    if(updated)    parts.push(updated + ' updated');
    if(alreadySet) parts.push(alreadySet + ' already set');
    if(failed)     parts.push(failed + ' could not be set');
    if(skipped)    parts.push(skipped + ' skipped');
    var dm = $('doneMsg');
    var warn = failed > 0 || nothing;
    dm.className = 'done-msg ok show' + (warn ? ' warn' : '');
    dm.innerHTML = '<span class="done-ic">' + (warn ? DONEWARN : DONEOK) + '</span><span>' +
      (nothing ? 'Nothing to apply \u2014 check your selections' : parts.join(' \u00b7 ')) + '</span>';
    btnLabel.textContent = 'Close'; btnIcon.style.display = 'none'; btnMain.disabled = false;
    // once applying is done, return the list to the top (same as the Preview screen)
    $('logList').scrollTop = 0;
  }

  /* ── Buttons + inbound messages ── */
  btnMain.addEventListener('click', function(){
    if(step === 'main') requestPreview();
    else if(step === 'preview') runApply();
    else parent.postMessage({ pluginMessage: { type: 'close' } }, '*');
  });

  window.onmessage = function(e){
    var msg = e.data && e.data.pluginMessage; if(!msg) return;
    if(msg.type === 'collections')   renderCollections(msg.data);
    else if(msg.type === 'preview')  renderPreview(msg.data, msg.warnings);
    else if(msg.type === 'log')      appendLog(msg);
    else if(msg.type === 'done')     finishApply(msg);
  };

  /* ── External links: inside a Figma iframe native <a> clicks don't open. ──
     Route every link (mailto + https) through window.open so the OS mail client
     / browser opens. Make the author block open LinkedIn too. */
  function openExternal(url){ if(!url) return; try{ window.open(url, '_blank'); }catch(err){} }
  document.querySelectorAll('a[href]').forEach(function(a){
    a.addEventListener('click', function(ev){ ev.preventDefault(); openExternal(a.getAttribute('href')); });
  });
  var authorEl = document.querySelector('.c-author');
  if(authorEl){
    authorEl.style.cursor = 'pointer';
    authorEl.setAttribute('title', 'Open LinkedIn');
    authorEl.addEventListener('click', function(){ openExternal('https://www.linkedin.com/in/dariazoria'); });
  }

  setStep('main');
})();
</script>
</body>
</html>`;

// ─── Naming converters ────────────────────────────────────────────────────────

// Split on ALL separators: / \ - _ and spaces
function splitSegments(name) {
  return name.trim().split(/[\/\\\-_\s]+/).filter(Boolean);
}

// Web: --segment-segment-segment (lowercase, dashes)
function toWeb(name) {
  return "--" + splitSegments(name).join("-").toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-+|-+$/g, "");
}

// Android: segment_segment_segment (lowercase, underscores)
function toAndroid(name) {
  return splitSegments(name).join("_").toLowerCase().replace(/[^a-z0-9_]/g, "").replace(/_+/g, "_").replace(/^_+|_+$/g, "");
}

// iOS: segmentSegmentSegment (camelCase)
function toIos(name) {
  const segs = splitSegments(name).map(s => s.toLowerCase().replace(/[^a-z0-9]/g, "")).filter(Boolean);
  return segs.map((s, i) => i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)).join("");
}

function isValidWeb(s) { return /^--[a-z][a-z0-9-]*$/.test(s); }
function isValidAndroid(s) { return /^[a-z][a-z0-9_]*$/.test(s); }
function isValidIos(s) { return /^[a-z][a-zA-Z0-9]*$/.test(s); }

const converters = {
  WEB:     { fn: toWeb,     validate: isValidWeb },
  ANDROID: { fn: toAndroid, validate: isValidAndroid },
  IOS:     { fn: toIos,     validate: isValidIos },
};

// ─── Load variables using parallel Promise.all per collection ─────────────────

async function loadVariables(collections, selectedIds) {
  const selectedColIds = new Set(selectedIds);
  const colNameMap = {};
  for (const col of collections) colNameMap[col.id] = col.name;

  const results = [];
  for (const col of collections) {
    if (!selectedColIds.has(col.id)) continue;
    const vars = await Promise.all(col.variableIds.map(id => figma.variables.getVariableByIdAsync(id)));
    for (const v of vars) {
      if (v) results.push({ v, colName: colNameMap[col.id] || col.name });
    }
  }
  return results;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();

  figma.showUI(htmlUI, { width: 400, height: 650, title: "Set Code Syntax", themeColors: true });

  figma.ui.postMessage({
    type: "collections",
    data: collections.map(c => ({ id: c.id, name: c.name, count: c.variableIds.length }))
  });

  figma.ui.onmessage = async (msg) => {

    if (msg.type === "preview") {
      const platforms = msg.platforms;
      const types = new Set(msg.types);
      const previews = [];
      const warnings = [];

      try {
        const vars = await loadVariables(collections, msg.selectedIds);
        for (const { v, colName } of vars) {
          if (v.resolvedType === "BOOLEAN" || !types.has(v.resolvedType)) continue;
          const platResults = {};
          let hasInvalid = false;
          for (const p of platforms) {
            const val = converters[p].fn(v.name);
            platResults[p] = val;
            if (!converters[p].validate(val)) hasInvalid = true;
          }
          previews.push({ name: v.name, type: v.resolvedType, platforms: platResults, collection: colName });
          if (hasInvalid) warnings.push(v.name);
        }
      } catch(e) {
        figma.notify("Preview error: " + e.message, { error: true });
      }

      figma.ui.postMessage({ type: "preview", data: previews, warnings });
    }

    if (msg.type === "run") {
      const platforms = msg.platforms;
      const types = new Set(msg.types);
      let updated = 0, set = 0, skipped = 0, failed = 0, alreadySet = 0;

      let vars = [];
      try {
        vars = await loadVariables(collections, msg.selectedIds);
      } catch(e) {
        figma.ui.postMessage({ type: "done", updated: 0, set: 0, skipped: 0, failed: 0, alreadySet: 0 });
        figma.notify("Error loading variables: " + e.message, { error: true });
        return;
      }

      for (const { v, colName } of vars) {
        try {
          if (v.resolvedType === "BOOLEAN") { skipped++; continue; }
          if (!types.has(v.resolvedType)) { skipped++; continue; }

          const platResults = {};
          let allValid = true;
          for (const p of platforms) {
            const val = converters[p].fn(v.name);
            if (!converters[p].validate(val)) { allValid = false; break; }
            platResults[p] = val;
          }

          if (!allValid) {
            failed++;
            figma.ui.postMessage({ type: "log", status: "error", name: v.name, platforms: "\u26a0\ufe0f invalid name", collection: colName });
            continue;
          }

          // Figma API platform name map \u2014 "IOS" must be passed as "iOS"
          const platformAPIName = { WEB: "WEB", ANDROID: "ANDROID", IOS: "iOS" };

          // Check if all platforms already have this exact value
          const alreadyAllSet = platforms.every(p => {
            const existing = v.codeSyntax && v.codeSyntax[platformAPIName[p] || p];
            return existing === platResults[p];
          });
          if (alreadyAllSet) {
            alreadySet++;
            figma.ui.postMessage({ type: "log", status: "skip", name: v.name, platforms: "already set", collection: colName });
            continue;
          }

          // Was any target platform previously filled? If not, this is a first-time SET; otherwise it's an UPDATE.
          const hadPrior = platforms.some(p => {
            const existing = v.codeSyntax && v.codeSyntax[platformAPIName[p] || p];
            return existing != null && existing !== "";
          });

          // Set each platform syntax separately with individual try/catch
          const applied = [];
          for (const [p, val] of Object.entries(platResults)) {
            try {
              await v.setVariableCodeSyntax(platformAPIName[p] || p, val);
              applied.push(val);
            } catch(e) {
              figma.ui.postMessage({ type: "log", status: "error", name: v.name + " [" + p + "]", platforms: e.message, collection: colName });
            }
          }

          if (applied.length > 0) {
            if (hadPrior) updated++; else set++;
            figma.ui.postMessage({ type: "log", status: "ok", name: v.name, platforms: applied.join(" \u00b7 "), collection: colName });
          } else {
            failed++;
          }

        } catch(e) {
          failed++;
          figma.ui.postMessage({ type: "log", status: "error", name: v.name, platforms: e.message, collection: colName });
        }
      }

      figma.ui.postMessage({ type: "done", updated, set, skipped, failed, alreadySet });
    }

    if (msg.type === "close") figma.closePlugin();
  };
})();
