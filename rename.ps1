$p = "c:\Users\180014\Desktop\안티그래비티 agent\I-DOL Chat\images\profiles\"
$d = "c:\Users\180014\Desktop\안티그래비티 agent\I-DOL Chat\images\daily\"

Rename-Item "${p}profile_harin_1772777927736.png" "harin.png" -ErrorAction SilentlyContinue
Rename-Item "${p}profile_yuna_1772777961962.png" "yuna.png" -ErrorAction SilentlyContinue
Rename-Item "${p}profile_seoyun_1772777977803.png" "seoyun.png" -ErrorAction SilentlyContinue
Rename-Item "${p}profile_jiwoo_1772778001173.png" "jiwoo.png" -ErrorAction SilentlyContinue
Rename-Item "${p}profile_minseo_1772778046950.png" "minseo.png" -ErrorAction SilentlyContinue
Rename-Item "${p}profile_daeun_1772778064133.png" "daeun.png" -ErrorAction SilentlyContinue

Rename-Item "${d}harin_daily1_1772778091904.png" "harin1.png" -ErrorAction SilentlyContinue
Rename-Item "${d}harin_daily2_1772778109816.png" "harin2.png" -ErrorAction SilentlyContinue
Rename-Item "${d}harin_daily3_1772778124705.png" "harin3.png" -ErrorAction SilentlyContinue
Rename-Item "${d}harin_daily4_1772778147972.png" "harin4.png" -ErrorAction SilentlyContinue
Rename-Item "${d}yuna_daily1_1772778175781.png" "yuna1.png" -ErrorAction SilentlyContinue
Rename-Item "${d}yuna_daily2_1772778192276.png" "yuna2.png" -ErrorAction SilentlyContinue
Rename-Item "${d}yuna_daily3_1772778225253.png" "yuna3.png" -ErrorAction SilentlyContinue
Rename-Item "${d}yuna_daily4_1772778238978.png" "yuna4.png" -ErrorAction SilentlyContinue
Rename-Item "${d}seoyun_daily1_1772778256329.png" "seoyun1.png" -ErrorAction SilentlyContinue
Rename-Item "${d}seoyun_daily2_1772778281469.png" "seoyun2.png" -ErrorAction SilentlyContinue
Rename-Item "${d}seoyun_daily3_1772778299780.png" "seoyun3.png" -ErrorAction SilentlyContinue
Rename-Item "${d}seoyun_daily4_1772778312374.png" "seoyun4.png" -ErrorAction SilentlyContinue

Get-ChildItem "c:\Users\180014\Desktop\안티그래비티 agent\I-DOL Chat\images" -Recurse -File | Select-Object Name
